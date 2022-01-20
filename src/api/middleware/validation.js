const { respond } = require('../helpers/respond');

function validate(validator) {
  return async (ctx, next) => {
    const { errors } = await validator.validate(ctx.request);

    if (errors !== null) {
      respond(ctx, errors, 400);

      return;
    }

    await next();
  };
}

module.exports = {
  validate,
};
