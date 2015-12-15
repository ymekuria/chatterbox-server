// var dispatcher = require('httpdispatcher');
var messages = require('./messages.js');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  if (request.method === 'GET' && request.url === '/classes/messages') {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(200, headers);
    response.end(JSON.stringify(messages));
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    request.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      response.on('error', function(err) {
        console.error(err);
      });

      var reqObj = JSON.parse(body);
      messages.addMessage(reqObj.username, reqObj.roomName, reqObj.message);

      var headers = defaultCorsHeaders;
      headers['Content-Type'] = "application/json";
      response.writeHead(201, headers);
      response.end('{"status": "ok"}');
    });
  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(200, headers);
    response.end();
  } else {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(404, headers);
    response.end();
  }
};

module.exports.requestHandler = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

