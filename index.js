/** Primary file for the API */

// Dependencies

var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');

// Instantiating the HTTP server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res)
});

// Start the server
httpServer.listen(config.httpPort, function () {
  console.log("The server is listening on port " + config.httpPort);
});


// Instantiating the HTTPS server
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res)
});


// Start the HTTPS server
httpsServer.listen(config.httpsPort, function () {
  console.log("The server is listening on port " + config.httpsPort);
});


// All the server logic for both the http and https server.
var unifiedServer = function (req, res) {
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

  // 7. data event will get called only if there's payload
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });

  // 8. end event will always get called with or without a payload
  req.on('end', function () {
    buffer += decoder.end();

    /** 
     * @description 8.1. choose the handler this request should go to.
     * if one is not found use the notFound handler.
    */
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // 8.2. Construct the data object to send to the handler.
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // 8.3. Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // 8.3.1. Use the status code called back by the handler, or default to 200.
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      // 8.3.2. Use the payload called back by the handler or default to 200.
      payload = typeof (payload) == "object" ? payload : {};

      // 8.3.3. Convert the payload to a string.
      var payloadString = JSON.stringify(payload);

      // 8.3.4. return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // 8.3.5. Log the request path
      console.log('Returning this response: ', statusCode, payloadString);

    });


  })

};


// Define the handlers
var handlers = {}

/**
 * @description Sample handler: this function takes in the data object and a callback function that'll route the request
 * to the specified request handler in the router.
 * @Param {Object} data - the data to send to the handler
 * @Param {Function} callback - the callback function
*/
handlers.sample = function (data, callback) {
  // callback a http status code, and a payload object
  callback(406, { 'name': 'sample handler' })
};

// not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Define a request router
var router = {
  'sample': handlers.sample
};