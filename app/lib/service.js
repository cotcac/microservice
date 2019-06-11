const axios = require('axios');
exports.callService = async function callService(requestOptions) {
    const response = await axios(requestOptions);
    return response.data;
};
exports.getService =  async function getService(serviceName) {
    // this should be in config file not hard code :)
    const response = await axios.get(`http://localhost:3003/find/${serviceName}/1.0/`);
    return response.data;
};