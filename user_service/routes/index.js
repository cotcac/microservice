var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    id:1,
    name: 'Kinny',
    email:'abc@abc.com'
  })
});

module.exports = router;
