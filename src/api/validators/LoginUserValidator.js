const joi = require('joi');
const RequestValidator = require('./RequestValidator');

class LoginUserValidator extends RequestValidator {
  rules = joi.object().keys({
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  });
}

module.exports = LoginUserValidator;
