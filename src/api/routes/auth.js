const { validate } = require('../middleware/validation');
const { respond } = require('../helpers/respond');

const RegisterUserValidator = require('../validators/RegisterUserValidator');
const RegisterUserController = require('../controllers/RegisterUserController');
const LoginUserValidator = require('../validators/LoginUserValidator');
const LoginUserController = require('../controllers/LoginUserController');

function register(router) {
  router.post(
    '/users/register',
    validate(new RegisterUserValidator()),
    async (ctx) => {
      const controller = new RegisterUserController();
      const { name, email, password } = ctx.request.body;

      const data = await controller.handle({ name, email, password });

      return data
        ? respond(ctx, data)
        : respond(ctx, "Couldn't register user with given credentials", 400);
    }
  );

  router.post(
    '/users/login',
    validate(new LoginUserValidator()),
    async (ctx) => {
      const controller = new LoginUserController();

      const data = await controller.handle(ctx.request.body);

      return data ? respond(ctx, data) : respond(ctx, null, 400);
    }
  );
}

module.exports = { register };
