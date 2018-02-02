var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog", {native_parser: true});
/* GET users listing. */


router.get('/', function(req, res, next) {
  db.collection('article').find().toArray(function (err, result) {
    db.close();
    console.log(err);
    res.send(result);
  });
});

module.exports = router;
