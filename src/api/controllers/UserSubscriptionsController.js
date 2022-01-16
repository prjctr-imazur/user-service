const { User } = require('../../database/models');

const loggerService = require('../../services/LoggerService');
const gatewayService = require('../../services/GatewayService');
const assert = require('../helpers/assert');

class UserSubscriptionsController {
  async handle({ id }) {
    try {
      const user = await User.findByPk(id);

      assert(user, `User with id "${id}" doesn't exists`);

      const result = await gatewayService.get(`/subscriptions?userId=${id}`);

      return result?.data;
    } catch (err) {
      loggerService.error(err.message);

      return [];
    }
  }
}

module.exports = UserSubscriptionsController;
