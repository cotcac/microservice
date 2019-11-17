const axios = require('axios');
const CircuitBreaker = require('./circuitBreaker');
const circuitBreaker = new CircuitBreaker();
exports.callService = async function callService(requestOptions) {
    return circuitBreaker.callService(requestOptions);
};
/**
 * { timestamp: 1574009698,
  ip: '[::ffff:127.0.0.1]',
  port: '3002',
  name: 'users',
  version: '1.0' }
 */
exports.getService =  async function getService(serviceName) {
    // this should be in config file not hard code :)
    const response = await axios.get(`http://localhost:3003/find/${serviceName}/1.0/`);
    console.log(response.data);
    
    return response.data;
};