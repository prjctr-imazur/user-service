const joi = require('joi');
const RequestValidator = require('./RequestValidator');

class UserHistoryValidator extends RequestValidator {
  rules = joi.object().keys({
    params: joi.object({
      id: joi.number().positive().required(),
    }),
  });
}

module.exports = UserHistoryValidator;
