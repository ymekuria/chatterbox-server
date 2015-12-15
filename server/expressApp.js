var express = require('express');
var messages = require('./messages.js');
var app = express();

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

app.get('/', function(req,res){
  res.send('Hello Worldss');
});

app.get('/classes/messages', function (req, res) {
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  res.send(JSON.stringify(messages));
});

var server = app.listen(3001, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
