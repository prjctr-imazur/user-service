const joi = require('joi');
const RequestValidator = require('./RequestValidator');

class RegisterUserValidator extends RequestValidator {
  rules = joi.object().keys({
    body: joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).max(256).required(),
    }),
  });
}

module.exports = RegisterUserValidator;
