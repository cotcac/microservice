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
    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(error.status).json(error.data);
  }
});

module.exports = router;
