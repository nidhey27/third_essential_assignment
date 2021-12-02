const Joi = require("@hapi/joi");

const createUSer = (data) => {
  const user = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().required(),
    dob: Joi.string().required(),
    phone_number: Joi.string().max(10).required(),
  };

  return Joi.validate(data, user);
};
module.exports = {
    createUSer
};
