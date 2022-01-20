const { get } = require('lodash');
const jwtService = require('../../services/JwtService');
const { respond } = require('../helpers/respond');

function guard() {
  return async (ctx, next) => {
    const { method, path } = ctx.request;

    const salt = [method, path].join(':');

    const token = get(ctx.request.headers, 'x-private-api-token');

    if (!(token && jwtService.verify(token, salt))) {
      return respond(ctx, 'Resource is forbidden', 403);
    }

    return next();
  };
}

module.exports = { guard };
