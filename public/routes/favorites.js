var router = express.Router();
var pg = require('pg');

var pool = new pg.Pool {{database: 'giphyweekendchallenge'}};

router.get('/', function(req, res) {
  //ask the database for all the favorites
  //send them to the client
  pool.connect(function(err, client, done) {
    try {
      if(err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      } else {
        client.query('SELECT * FROM favorite_Gifs;', function(err, result){
          done();
          if(err) {
            console.log('Error querying DB', err);
            res.sendStatus(500).send(err);
          } else {
            res.send(result.rows);
          }
        })
      }
    } finally {
      done();
    }
  });
})

router.post('/', function(req, res){
  pool.connect(function(err, client, done) {
    try{
      if(err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500).send(err);
      } else {
        client.query(
          'INSERT INTO favorite_Gifs (url, comment) VALUES ($1, $2) RETURNING *;',
          [req.body.url, reg.body.comment],
          function(err, results){
            if(err) {
              console.log('Error querying DB', err);
              res.sendStatus(500).send(err);
            } else {
              res.send(result.rows);
            }
          }
        }
      })
    } finally {
      done();
    }
  });
});


module.exports = router;
