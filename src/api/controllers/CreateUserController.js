const { User } = require('../../database/models');
const loggerService = require('../../services/LoggerService');

class CreateUserController {
  async handle({ email, name }) {
    try {
      const [user, newUser] = await User.findOrCreate({
        where: { email, name },
      });

      if (!newUser) {
        const message = `User with "${email}" already exists`;

        loggerService.debug(message);

        throw new Error(message);
      }

      loggerService.debug(`User "${email}" successfully created`);

      return [null, user];
    } catch (err) {
      loggerService.error(err.message);

      return [err.message, null];
    }
  }
}

module.exports = CreateUserController;
