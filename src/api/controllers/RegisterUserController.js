const bcrypt = require('bcrypt');
const { User } = require('../../database/models');
const loggerService = require('../../services/LoggerService');

class RegisterUserController {
  async handle({ name, email, password: plainPassword }) {
    try {
      let user = await User.findOne({ where: { email } });

      if (user) {
        throw new Error(`User '${email}' already exists`);
      }

      const password = await bcrypt.hash(plainPassword, 12);

      user = await User.create({ name, email, password });

      return user;
    } catch (err) {
      loggerService.error(`Registration user error: ${err.message}`);

      return null;
    }
  }
}

module.exports = RegisterUserController;
