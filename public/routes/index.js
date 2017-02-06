var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
  database: 'giphyweekendchallenge'
};

//initialize connection Pool
var pool = new pg.Pool(config);

router.get('/', function(req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {

      client.query('SELECT * FROM favorite_Gifs;', function(err, result){
        done();
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        } else {
          console.log('Got info from DB', result.rows);
          res.send(result.rows);
        }
      })
    }
  });
})
router.post('/', function(req, res){
  //err- an error object, will be non null if there was some error
  //    connecting to the DB, ex. DB not running, config is incorrect

  //client- used to make actual queries against DB

  //done- function to call when we are finished
  //      returns the connection back to the pool

  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      //no error occurred, time to query

      //1.sql string - the actual SQL query we want to run.
      //2. callback - function to run after the database gives us our result
      //              takes an error object and the result object as its args
      client.query(
        'INSERT INTO favorite_Gifs (url, comment) VALUES ($1, $2) RETURNING *;',
      [req.body.task],
      function(err, result){
        done();
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        } else {
          console.log('Got info from DB', result.rows);
          res.send(result.rows);
        }
      })
    }
  });
});
router.put('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error conneting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('UPDATE tasks SET finished=$2 WHERE id = $1 RETURNING *',
      [req.params.id, 'true'],
      function(err, result){
        done();
        if (err){
          console.log('Error complete task', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });//end client-query statement
    }
  });
});

module.exports = router;
