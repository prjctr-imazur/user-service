const { omitBy, isEmpty } = require('lodash');

function success(ctx, data = null, status = 200) {
  ctx.status = status;

  ctx.body = { data };
}

function notfound(ctx) {
  ctx.status = 404;

  ctx.body = '';
}

function error(ctx, errors = null, status = 400) {
  ctx.status = status;

  ctx.body = omitBy({ errors }, isEmpty);
}

function fails(ctx, errors = null, status = 400) {
  return status === 404 ? notfound(ctx) : error(ctx, errors, status);
}

function respond(ctx, payload = null, status = 200) {
  return status < 400
    ? success(ctx, payload, status)
    : fails(ctx, payload, status);
}

module.exports = {
  respond,
  success,
  fails,
  notfound,
  error,
};
