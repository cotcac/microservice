const axios = require("axios");
const CircuitBreaker = require("./circuitBreaker");
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
exports.getService = async function getService(serviceName) {
  // this should be in config file not hard code :)

  return new Promise((res, rej) => {
    axios
      .get(`http://192.168.43.230:3003/find/${serviceName}/1.0/`)
      .then(r => {
        return res(r.data);
      })
      .catch(e => {
        return rej({
          status: e.response.status || 500,
          data: e.response.data || "unknown"
        });
      });
  });
};
