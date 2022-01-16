const { omitBy, isEmpty } = require('lodash');

const success = (ctx, data, status = 200) => {
  ctx.status = status;

  ctx.body = { data };
};

const failure = (ctx, errors, status = 400) => {
  ctx.status = status;


  ctx.body = omitBy({ errors }, isEmpty);
};

const notfound = (ctx) => {
  ctx.status = 404;

  ctx.body = '';
};

module.exports = { success, failure, notfound };
