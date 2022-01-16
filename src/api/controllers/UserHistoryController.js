const { User } = require('../../database/models');

const loggerService = require('../../services/LoggerService');
const gatewayService = require('../../services/GatewayService');
const assert = require('../helpers/assert');

class UserHistoryController {
  async handle({ id }) {
    try {
      const user = await User.findByPk(id);

      assert(user, `User with id "${id}" doesn't exists`);

      const history = await gatewayService.get(`/history?userId=${id}`);

      return history?.data;
    } catch (err) {
      loggerService.error(err.message);

      return [];
    }
  }
}

module.exports = UserHistoryController;