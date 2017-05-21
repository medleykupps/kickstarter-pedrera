var http = require('http');

http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello world\n");

}).listen(8000);

console.log('Running on http://localhost:8000');
