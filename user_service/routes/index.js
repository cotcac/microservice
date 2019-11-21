var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.status(200).json([
    {
      id: 1,
      name: "Kinny",
      email: "abc@abc.com"
    },
    {
      id: 2,
      name: "David",
      email: "david@abc.com"
    }
  ]);
});
// slow service example
router.get("/slow", function(req, res, next) {
  setTimeout(() => {
    res.status(200).json({
      id: 1,
      name: "Kinny",
      email: "abc@abc.com"
    });
  }, 5000);
});

// server error service example

router.get("/err", function(req, res, next) {
  throw new Error("something bad happened");
});

module.exports = router;
