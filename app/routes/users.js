var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const {ip,port} = await getService('users');
  const data = await callService({
    method:'get',
    url: `http://${ip}:${port}/` 
  })
  res.json(data)
});

async function callService(requestOptions) {
  const response = await axios(requestOptions);
  return response.data;
};
async function getService(serviceName) {
  const response = await axios.get(`http://localhost:3003/find/${serviceName}/1.0/`);
  return response.data;
};

module.exports = router;
