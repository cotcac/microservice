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
  const { ip, port } = await service.getService("posts");
  const data = await service.callService({
    method: "get",
    url: `http://${ip}:${port}/`
  });
  res.json(data);
});

// post a post
router.post("/posts", async (req, res) => {
  const { name, userId, content } = req.body;
  const q = "posts";
  const connect = await amqplib.connect("amqp://localhost");
  const ch = await connect.createChannel();
  await ch.assertQueue(q);
  const queueMsg = JSON.stringify({ name, userId, content });
  ch.sendToQueue(q, Buffer.from(queueMsg, "utf8"));
  res.send("sent");
});

module.exports = router;
