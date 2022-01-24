const { validate } = require('../middleware/validation');
const { respond } = require('../helpers/respond');

const CreateUserValidator = require('../validators/CreateUserValidator');
const CreateUserController = require('../controllers/CreateUserController');

const ShowUserValidator = require('../validators/ShowUserValidator');
const ShowUserController = require('../controllers/ShowUserController');

const UserHistoryValidator = require('../validators/UserHistoryValidator');
const UserHistoryController = require('../controllers/UserHistoryController');

const UserVideosValidator = require('../validators/UserVideosValidator');
const UserVideosController = require('../controllers/UserVideosController');

const UserSubscriptionsValidator = require('../validators/UserSubscriptionsValidator');
const UserSubscriptionsController = require('../controllers/UserSubscriptionsController');

const ForeverCacheDecorator = require('../../decorators/ForeverCacheDecorator');

function register(router) {
  router.post('/users', validate(new CreateUserValidator()), async (ctx) => {
    const controller = new CreateUserController();

    const { email, name } = ctx.request.body;

    const [error, data] = await controller.handle({ email, name });

    return error ? respond(ctx, error, 400) : respond(ctx, data, 201);
  });

  router.get('/users/:id', validate(new ShowUserValidator()), async (ctx) => {
    const { id } = ctx.request.params;

    const controller = new ForeverCacheDecorator(
      new ShowUserController(),
      `users.${id}`
    );

    const user = await controller.handle({ id });

    return user ? respond(ctx, user) : respond(ctx, null, 404);
  });

  router.get(
    '/users/:id/history',
    validate(new UserHistoryValidator()),
    async (ctx) => {
      const { id } = ctx.request.params;

      const controller = new ForeverCacheDecorator(
        new UserHistoryController(),
        `users.${id}.history`
      );

      const user = await controller.handle({ id });

      return user ? respond(ctx, user) : respond(ctx, null, 404);
    }
  );

  router.get(
    '/users/:id/subscriptions',
    validate(new UserSubscriptionsValidator()),
    async (ctx) => {
      const { id } = ctx.request.params;

      const controller = new ForeverCacheDecorator(
        new UserSubscriptionsController(),
        `users.${id}.subscriptions`
      );

      const user = await controller.handle({ id });

      return user ? respond(ctx, user) : respond(ctx, null, 404);
    }
  );

  router.get(
    '/users/:id/videos',
    validate(new UserVideosValidator()),
    async (ctx) => {
      const { id } = ctx.request.params;

      const controller = new ForeverCacheDecorator(
        new UserVideosController(),
        `users.${id}.videos`
      );

      const user = await controller.handle(ctx.request.params);

      return user ? respond(ctx, user) : respond(ctx, null, 404);
    }
  );
}

module.exports = { register };
