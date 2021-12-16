const configService = require('../../services/ConfigService');

class HealthController {
  async handle() {
    const { name, version } = configService;

    return { name, version };
  }
}

module.exports = HealthController;
