var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var resource = {
        id: '1001',
        name: 'Joe Bloggs'
    };

    res.send(resource);

});

module.exports = router;
