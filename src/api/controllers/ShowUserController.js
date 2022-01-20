const { User } = require('../../database/models');

const loggerService = require('../../services/LoggerService');
const gatewayService = require('../../services/GatewayService');
const assert = require('../helpers/assert');

class ShowUserController {
  async handle({ id }) {
    try {
      const user = await User.findByPk(id);

      assert(user, `User with id "${id}" doesn't exists`);

      const batch = await Promise.allSettled([
        gatewayService.get(`/videos?userId=${id}`),
        gatewayService.get(`/subscriptions?userId=${id}`),
        gatewayService.get(`/history?userId=${id}`),
      ]);

      const [videos, subscriptions, history] = batch.map(
        (payload) => payload?.value?.data ?? []
      );

      return {
        user,
        videos,
        history,
        subscriptions,
      };
    } catch (err) {
      loggerService.error(`Error while fetching user [${id}]: ${err.message}`);
      return null;
    }
  }
}

module.exports = ShowUserController;
