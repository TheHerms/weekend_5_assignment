var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path')
var bodyParser = require('body-parser');
var pg = require('pg');
var index = require("./routes/favorites");
// var config = {database: 'favorite_Gifs'}

var server = app.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});
