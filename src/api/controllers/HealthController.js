const { name, version } = require('../../../package.json');

class HealthController {
  async handle() {
    return { name, version };
  }
}

module.exports = HealthController;
