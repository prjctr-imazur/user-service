const joi = require('joi');
const { User } = require('../../database/models');

const loggerService = require('../../services/LoggerService');
const gatewayService = require('../../services/GatewayService');

class ShowUserController {
  async handle({ id }) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error(`User with id "${id}" doesn't exists`);
      }

      const batch = await Promise.allSettled([
        gatewayService.get(`/videos?userId=${id}`),
        gatewayService.get(`/subscriptions?userId=${id}`),
        gatewayService.get(`/history?userId=${id}`),
      ]);

      const [videos = [], subscriptions = [], history = []] = batch.map(
        ({ value: { data } }) => data
      );

      return { user, videos, history, subscriptions };
    } catch (err) {
      loggerService.error(err.message);
      return null;
    }
  }
}

module.exports = ShowUserController;
