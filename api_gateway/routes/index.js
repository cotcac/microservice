var express = require("express");
var router = express.Router();
const service = require("../lib/service");
const amqplib = require("amqplib");

// Home

router.get("/", function(req, res) {
  res.send("OK im good");
});

/* GET post listing. */
router.get("/posts", async function(req, res, next) {
  try {
    const { ip, port } = await service.getService("posts");
    const data = await service.callService({
      method: "get",
      url: `http://${ip}:${port}/`
    });
    res.json(data);
  } catch (error) {
    res.status(error.status).json(error.data);
  }
});

module.exports = router;
