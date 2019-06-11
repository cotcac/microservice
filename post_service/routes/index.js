var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    id:1,
    name:'Hello world',
    userId:1,
    content:'this is my first post so it not going to be good. It a shit one actually!'
  })
});

module.exports = router;
