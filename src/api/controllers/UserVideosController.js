const { User } = require('../../database/models');

const loggerService = require('../../services/LoggerService');
const gatewayService = require('../../services/GatewayService');
const assert = require('../helpers/assert');

class UserVideosController {
  async handle({ id }) {
    try {
      const user = await User.findByPk(id);

      assert(user, `User with id "${id}" doesn't exists`);

      const videos = await gatewayService.get(`/videos?userId=${id}`);

      return videos?.data;
    } catch (err) {
      loggerService.error(err.message);

      return [];
    }
  }
}

module.exports = UserVideosController;
