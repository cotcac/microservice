var express = require('express');
var router = express.Router();
const service = require('../lib/service');

/* GET post listing. */
router.get('/posts', async function(req, res, next) {
  const {ip,port} = await service.getService('posts');
  const data = await service.callService({
    method:'get',
    url: `http://${ip}:${port}/` 
  })
  res.json(data)
});



module.exports = router;
