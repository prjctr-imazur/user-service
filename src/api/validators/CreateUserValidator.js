const joi = require('joi');
const RequestValidator = require('./RequestValidator');

class CreateUserValidator extends RequestValidator {
  rules = joi.object().keys({
    body: joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
    }),
  });
}

module.exports = CreateUserValidator;
