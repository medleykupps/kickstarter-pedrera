var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.get('/', function(req, res) {
    res.send("Hello world!  I've changed 2");
})


app.listen(8000, function() {
    logger('listening on 8000');
})
