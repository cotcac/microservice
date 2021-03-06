const axios = require("axios");
//TODO
// when service back to life have to make circut from open to close immidiately not have to wait for xxx time.
class CircuitBreaker {
  constructor() {
    this.states = {};
    this.failureThreshold = 5; //times
    this.cooldownPeriod = 100; // after x seconds it will try to call micro service again.
    this.requestTimeout = 1; // second
  }

  async callService(requestOptions) {
    const endpoint = `${requestOptions.method}:${requestOptions.url}`;

    if (!this.canRequest(endpoint)) return false;
    requestOptions.timeout = this.requestTimeout * 1000;

    try {
      const response = await axios(requestOptions);
      this.onSuccess(endpoint);
      return response.data;
    } catch (err) {
      this.onFailure(endpoint);
      return false;
    }
  }

  onSuccess(endpoint) {
    this.initState(endpoint);
  }

  onFailure(endpoint) {
    const state = this.states[endpoint];
    state.failures += 1;
    if (state.failures > this.failureThreshold) {
      state.circuit = "OPEN";
      state.nextTry = new Date() / 1000 + this.cooldownPeriod;
      console.log(`ALERT! Circuit for ${endpoint} is in state 'OPEN'`);
    }
  }

  canRequest(endpoint) {
    if (!this.states[endpoint]) this.initState(endpoint);
    const state = this.states[endpoint];
    if (state.circuit === "CLOSED") return true;
    const now = new Date() / 1000;
    if (state.nextTry <= now) {
      state.circuit = "HALF";
      return true;
    }
    return false;
  }

  initState(endpoint) {
    this.states[endpoint] = {
      failures: 0,
      cooldownPeriod: this.cooldownPeriod,
      circuit: "CLOSED",
      nextTry: 0
    };
  }
}

module.exports = CircuitBreaker;
