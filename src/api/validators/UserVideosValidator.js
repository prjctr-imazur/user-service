const joi = require('joi');
const RequestValidator = require('./RequestValidator');

class ShowUserValidator extends RequestValidator {
  rules = joi.object().keys({
    params: joi.object({
      id: joi.number().positive().required(),
    }),
  });
}

module.exports = ShowUserValidator;
