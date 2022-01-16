const Router = require('koa-router');

const health = require('./health');
const users = require('./users');

const router = new Router();

health.register(router);

users.register(router);

module.exports = router;
