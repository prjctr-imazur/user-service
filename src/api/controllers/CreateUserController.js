const { User } = require('../../database/models');
const loggerService = require('../../services/LoggerService');

class CreateUserController {
  async handle({ email, name }) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email, name },
      });

      if (created) {
        loggerService.debug(`User ${email} successfully created`);
      } else {
        loggerService.debug(`User ${email} already exists`);
      }

      return user;
    } catch (err) {
      loggerService.error('Create user error', err.message);
      return null;
    }
  }
}

module.exports = CreateUserController;
