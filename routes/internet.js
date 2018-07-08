let express = require('express');
let cm = require('../lib/common');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('internet', { random:
            cm.randomString('6', 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890')
    });
});

router.get('/api/v1/', function(req, res, next) {
    res.send(
        cm.randomString('6', 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890')
    );
});

module.exports = router;