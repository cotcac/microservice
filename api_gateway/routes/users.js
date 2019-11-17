var express = require('express');
var router = express.Router();
const service = require('../lib/service');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const {ip,port} = await service.getService('users');
  const data = await service.callService({
    method:'get',
    url: `http://${ip}:${port}/` 
  })
  res.json(data)
});
// get 1 user
router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  const {ip,port} = await service.getService('users');
  const data = await service.callService({
    method:'get',
    url: `http://${ip}:${port}/users/${id}` 
  })
  res.json(data)
});



module.exports = router;
