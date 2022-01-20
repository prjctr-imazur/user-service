const Router = require('koa-router');

const health = require('./health');

const users = require('./users');

const auth = require('./auth');

const router = new Router();

health.register(router);

users.register(router);

auth.register(router);

module.exports = router;
