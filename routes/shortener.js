let express = require('express');
let router = express.Router();
let db = require('level')('/opt/dev/shortendb');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('short');
});

router.get('/list', function(req, res, next) {
    let list = [];
    db.createReadStream()
        .on('data', function (data) {
            list.push(data.key + '=' + data.value)
        })
        .on('error', function (err) {
            console.log('Oh my!', err)
        })
        .on('close', function () {
            console.log('Stream closed')
        })
        .on('end', function () {
            res.send(list)
        })
});

router.get('/:id', function(req, res){
    db.get(req.params.id, function(err, data){
        data = JSON.parse(data)
        if (err) {
            res.status(404).send(err);
        }else{
            console.log(data.url)
            res.redirect(data.url);
        }
    });
});

router.post('/shorten', function(req, res, next) {
    let dbEntry = {};
    if (req.body.shortURL.slice(0,4) != "https"){
        dbEntry.url = "https://" + req.body.shortURL;
    }

    if (req.body.expiry){
        dbEntry.expiry = new Date(req.body.expiry);
    }

    let key = Math.random().toString(36).substring(7)
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