var express = require('express');
var router = express.Router();
const ServiceRegistry = require('../lib/service_registry');
const serviceRegistry = new ServiceRegistry();
/* GET home page. */
router.get('/', function(req, res, next) {
  const services = serviceRegistry.getAll();
  res.json(services);
});
// get service
router.get('/find/:serviceName/:serviceVersion',(req, res) =>{
  const {serviceName, serviceVersion} = req.params;
  const svc = serviceRegistry.get(serviceName, serviceVersion);
  if(!svc) return res.status(404).json({result:'Service not found!'});
  return res.json(svc);
})
// register service
router.put('/register/:serviceName/:serviceVersion/:servicePort', (req, res) =>{
  const {serviceName, serviceVersion, servicePort} = req.params;
  const serviceIp = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
  const serviceKey = serviceRegistry.register(serviceName, serviceVersion, serviceIp, servicePort);
  return res.json({result:serviceKey});
})
// delete service
router.delete('/register/:serviceName/:serviceVersion/:servicePort', (req, res) =>{
  const {serviceName, serviceVersion, servicePort} = req.params;
  const serviceIp = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
  const serviceKey = serviceRegistry.unregister(serviceName, serviceVersion, serviceIp, servicePort);
  return res.json({result:serviceKey});
})

module.exports = router;
