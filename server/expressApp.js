var express = require('express');
var bodyParser = require('body-parser')
var messages = require('./messages.js');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods","GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "content-type, accept");
  res.header("access-control-max-age","10");
  next();
});

app.get('/classes/messages', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(messages);
});

app.post('/classes/messages', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var reqObj = req.body;
  messages.addMessage(reqObj.username, reqObj.roomName, reqObj.message);
  res.status(201).json({objectId: messages.objectId});
});

app.options('/classes/messages', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send('{"status": "ok"}');
});

var server = app.listen(3001, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



