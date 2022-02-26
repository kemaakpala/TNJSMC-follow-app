/** Primary file for the API */

// Dependencies

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
var server = http.createServer(function (req, res) {
  // 1. Get the url and parse it
  var parsedUrl = url.parse(req.url, true); // setting the second parameter to true allows querystring to be returned as an object instead of an undecoded string.

  // 2. Get the path from the url
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, ''); // removes the 1st and last "/" but not the middle slash 

  // 3. Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // 4. Get the HTTP Method
  var method = req.method.toLowerCase();

  // 5. Get the Headers as an object
  var headers = req.headers;

  // 6. Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  // end event will always get called with or without a payload
  req.on('end', function () {
    buffer += decoder.end();

    // 7. Send the response
    res.end("Hello world\n")

    // 8. Log the request path
    console.log('Request recieved with these payload: ', buffer);
    console.log('queryStringObject:>', queryStringObject);
  })

});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
  console.log("The server is listening on port 3000 now");
});