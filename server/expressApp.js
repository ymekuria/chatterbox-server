var express = require('express');
var bodyParser = require('body-parser')
var messages = require('./messages.js');
var app = express();

app.use(bodyParser.json());


app.get('/classes/messages', function (req, res) {
  var headers = defaultCorsHeaders;
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(messages);
});

app.post('/classes/messages', function (req, res) {
  var headers = defaultCorsHeaders;
  res.setHeader('Content-Type', 'application/json');
  var reqObj = req.body;
  messages.addMessage(reqObj.username, reqObj.roomName, reqObj.message);
  res.status(201).json({objectId: messages.objectId});
});

var server = app.listen(3001, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
