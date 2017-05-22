var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var resource = require('./routes/resource');

var app = express();

// Initialise middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));


// Load routes to resources

app.use('/resources', resource);

// Handle 404s when not matched any routes defined above
app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});


app.listen(8000, function() {
    console.log('listening on 8000');
    console.log(__dirname);
})
