require('../bootstrap');

const packageJson = require('../../package.json');

class ConfigService {
  get name() {
    return packageJson.name;
  }

  get version() {
    return packageJson.version;
  }

  get environment() {
    return process.env.NODE_ENV || 'development';
  }

  get host() {
    return process.env.HOST;
  }

  get port() {
    return process.env.PORT;
  }

  get logLevel() {
    return process.env.LOG_LEVEL;
  }

  get gateway() {
    return process.env.GATEWAY_URL;
  }

  get database() {
    return {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER_NAME,
    };
  }

  get jwtSecret() {
    return process.env.JWT_SECRET;
  }
}

const configService = (function loadConfigService() {
  return new ConfigService();
  // eslint-disable-next-line prettier/prettier
}());

module.exports = configService;
