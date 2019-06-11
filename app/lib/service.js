const axios = require('axios');
const CircuitBreaker = require('./circuitBreaker');
const circuitBreaker = new CircuitBreaker();
exports.callService = async function callService(requestOptions) {
    return circuitBreaker.callService(requestOptions);
};
exports.getService =  async function getService(serviceName) {
    // this should be in config file not hard code :)
    const response = await axios.get(`http://localhost:3003/find/${serviceName}/1.0/`);
    return response.data;
};