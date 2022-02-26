/** Primary file for the API */

// Dependencies

var http = require('http');
var url = require('url');

// The server should respond to all requests with a string
var server = http.createServer(function(req,res){
  // 1. Get the url and parse it
  var parsedUrl = url.parse(req.url, true);

  // 2. Get the path from the url
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'')

  // 3. Get the HTTP Method
  var method = req.method.toLowerCase();

  // 4. Send the response
  res.end("Hello world\n")

  // 5. Log the request path
  console.log('Request received on path: '+ trimmedPath + ' with this method: ' + method);

});

// Start the server, and have it listen on port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000 now");
});