var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// Initialise middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));
console.log('Serving files from ' + path.join(__dirname, '../build'));

app.get('/', function(req, res) {
    res.send("Hello world!  I've changed 4");
})


app.listen(8000, function() {
    console.log('listening on 8000');
    console.log(__dirname);
})
