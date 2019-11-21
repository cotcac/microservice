var express = require("express");
var router = express.Router();
const service = require("../lib/service");
/* GET users listing. */
router.get("/", async function(req, res, next) {
  try {
    const { ip, port } = await service.getService("users");
    console.log(`http://${ip}:${port}/`);

    const data = await service.callService({
      method: "get",
      url: `http://${ip}:${port}/`
    });
    //
    if (!data) return res.sendStatus(503);
    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(error.status).json(error.data);
  }
});

// slow service
router.get("/slow", async function(req, res, next) {
  try {
    const { ip, port } = await service.getService("users");
    console.log(`http://${ip}:${port}/`);

    const data = await service.callService({
      method: "get",
      url: `http://${ip}:${port}/slow`
    });
    //
    if (!data) return res.sendStatus(503);
    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(error.status).json(error.data);
  }
});

// error service
router.get("/err", async function(req, res, next) {
  try {
    const { ip, port } = await service.getService("users");
    console.log(`http://${ip}:${port}/err`);

    const data = await service.callService({
      method: "get",
      url: `http://${ip}:${port}/err`
    });
    //
    if (!data) return res.sendStatus(503);
    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(error.status).json(error.data);
  }
});
module.exports = router;
