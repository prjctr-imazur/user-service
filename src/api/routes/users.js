const { validate } = require('../middleware/validation');
const respond = require('../helpers/respond');

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

function register(router) {
  router.post('/users', validate(new CreateUserValidator()), async (ctx) => {
    const controller = new CreateUserController();

    const data = await controller.handle(ctx.request.body);

    respond.success(ctx, data);
  });

  router.get('/users/:id', validate(new ShowUserValidator()), async (ctx) => {
    const controller = new ShowUserController();

    const user = await controller.handle(ctx.request.params);

    return user ? respond.success(ctx, user) : respond.notfound(ctx);
  });

  router.get(
    '/users/:id/history',
    validate(new UserHistoryValidator()),
    async (ctx) => {
      const controller = new UserHistoryController();

      const user = await controller.handle(ctx.request.params);

      return user ? respond.success(ctx, user) : respond.notfound(ctx);
    }
  );

  router.get(
    '/users/:id/subscriptions',
    validate(new UserSubscriptionsValidator()),
    async (ctx) => {
      const controller = new UserSubscriptionsController();

      const user = await controller.handle(ctx.request.params);

      return user ? respond.success(ctx, user) : respond.notfound(ctx);
    }
  );

  router.get(
    '/users/:id/videos',
    validate(new UserVideosValidator()),
    async (ctx) => {
      const controller = new UserVideosController();

      const user = await controller.handle(ctx.request.params);

      return user ? respond.success(ctx, user) : respond.notfound(ctx);
    }
  );
}

module.exports = { register };
