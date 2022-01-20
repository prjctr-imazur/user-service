const bcrypt = require('bcrypt');
const { User } = require('../../database/models');
const jwtService = require('../../services/JwtService');
const loggerService = require('../../services/LoggerService');

class LoginUserController {
  async handle({ email, password: plainPassword }) {
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error(`User '${email}' doesn't exists`);
      }

      await bcrypt.compare(plainPassword, user.password);

      const { id } = user;

      const token = jwtService.sign({
        id,
        email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      });

      return {
        token,
      };
    } catch (err) {
      loggerService.error(`Login user error: ${err.message}`);

      return null;
    }
  }
}

module.exports = LoginUserController;
