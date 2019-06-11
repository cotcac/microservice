var express = require('express');
var router = express.Router();

const axios = require('axios');
/* GET post listing. */
router.get('/posts', async function(req, res, next) {
  const {ip,port} = await getService('posts');
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
  // this should be in config file not hard code :)
  const response = await axios.get(`http://localhost:3003/find/${serviceName}/1.0/`);
  return response.data;
};

module.exports = router;
