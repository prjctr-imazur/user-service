const fetch = require('node-fetch');
const configService = require('./ConfigService');
const loggerService = require('./LoggerService');

class GatewayService {
  onerror(err, ...params) {
    loggerService.error({
      error: `Fetching from gateway error ${err.message}`,
      params,
    });
  }

  async get(path) {
    try {
      const url = `${configService.gateway}${path}`;
      const res = await fetch(url);
      return res.json();
    } catch (err) {
      this.onerror(err, path);
      return null;
    }
  }
}

const gatewayService = (function loadGatewayService() {
  return new GatewayService();
  // eslint-disable-next-line prettier/prettier
}());

module.exports = gatewayService;
