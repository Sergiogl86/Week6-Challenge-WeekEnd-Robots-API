const { Joi } = require("express-validation");

const loginSchema = {
  body: Joi.object({
    nombre: Joi.string().required(),
    contraseña: Joi.string().required(),
  }),
};

module.exports = loginSchema;
