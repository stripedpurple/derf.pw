let express = require('express');
let router = express.Router();
let cm = require('../lib/common');
let db = require('level')('/opt/dev/shortendb', key);

/* GET home page. */
router.get('/short', function(req, res, next) {
    res.render('short');
});

router.get('/:id', function(req, res){
    db.get(req.params.id, function(err, data){
        if (err) {
            res.status(404).send(err);
        }else{
            // res.redirect(data.url);
            console.log(JSON.stringify(data));
            res.send();
        }
    });
});

router.post('/shorten', function(req, res, next) {
    let dbEntry = {};
    if (req.body.shortURL.slice(0,4) != "http"){
        dbEntry.url = "http://" + req.body.shortURL;
    }

    if (req.body.expiry){
        dbEntry.expiry = new Date(req.body.expiry);
    }
    console.log(req.body);

    let key = cm.randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    db.get(key, function(err, data){
    
        if (err) {
            db.put(key, JSON.stringify(dbEntry), function(err){
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                    return -1;
                }
                res.send(key);
            });
        }
    });
});

module.exports = router;