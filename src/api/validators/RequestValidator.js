const joi = require('joi');
const { reduce, set } = require('lodash');

class RequestValidator {
  requestRules = joi.object().keys({
    headers: joi.any(),
    body: joi.any(),
    params: joi.any(),
    query: joi.any(),
  });

  validateBefore() {
    if (!joi.isSchema(this.rules)) {
      throw new Error('Rules should be an instance of Joi schema');
    }

    this.rules = this.requestRules.concat(this.rules);
  }

  validateAfter(errors) {
    return { errors };
  }

  errors(err) {
    if (joi.isError(err)) {
      return reduce(
        err?.details,
        (reduction, current) => set(reduction, current?.path, current?.message),
        {}
      );
    }
    throw err;
  }

  async validate({ headers, body, params, query }) {
    this.validateBefore();

    const request = { headers, body, params, query };

    try {
      await this.rules.validateAsync(request);
    } catch (error) {
      return this.validateAfter(this.errors(error));
    }

    return this.validateAfter(null);
  }
}

module.exports = RequestValidator;
