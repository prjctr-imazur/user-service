const configService = require('../../services/ConfigService');

module.exports = {
  [configService.environment]: {
    ...configService.database,
    dialect: 'postgres',
  },
};
