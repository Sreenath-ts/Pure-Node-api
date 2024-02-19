//dependecy
const http = require("http");
const url = require("url");
const log = require('./lib/logger');
const StringDecoder = require('string_decoder').StringDecoder;
//Server created

const server = http.createServer(function (req, res) {

  //parsing the request
  const parsedUrl = url.parse(req.url, true);

  //getting the query params
  const querys = parsedUrl.query;

  //getting the method
  const method = req.method.toLowerCase();

  //getting the path
  const path = parsedUrl.pathname;

  //trimming the unneccessary slashes
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //getting the header
  const headers = req.headers;
  
  //getting the payload
  let buffer = ''
  const decoder = new StringDecoder('utf-8')
  req.on('data',function(data){
    buffer += decoder.write(data)
  })

  //request ending event
  req.on("end",()=>{
    buffer += decoder.end()
    
    //choosing the correct the handler for each routes
    const choseHandler = typeof(routers[trimmedPath]) === 'undefined' ? handlers.notFound : routers[trimmedPath];
    let data = {
        trimmedPath,
        method,
        payload:buffer,
        headers,
        querys
    }

    choseHandler(data,function(statusCode=200,payload={}){
    log.blue(`Incoming request responsed with payload`,payload);
    payload = JSON.stringify(payload)
    res.writeHead(statusCode)
    res.end(payload);
    })
  })
  
});

server.listen(3000, () => {
  log.green("Server listening on port 3000");
});

var handlers = {}

handlers.sample = function(data,callback){
    //Data contains the detials about the request
    callback(406,{"name":"sample"});
}

handlers.notFound = function(data,cb){
    //If there are no handlers for the route then this will get executed
    cb(404)
}

var routers = {
    'sample' : handlers.sample
}