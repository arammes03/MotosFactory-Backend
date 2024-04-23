// Importamos JOI para validación de datos
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().alphanum().messages({
  'string.base': `"El nombre debe ser de tipo texto"`,
  'string.empty': `"El nombre no puede estar vacío"`,
});
const email = Joi.string().email().messages({
  'string.base': `"El email debe ser de tipo email"`,
  'string.empty': `"El email no puede estar vacío"`,
});
const password = Joi.string().alphanum().min(4).messages({
  'string.base': `"La contraseña debe tener al menos 4 caracteres"`,
  'string.empty': `"La contraseña no puede estar vacía"`,
});
/*const createAt = Joi.date();
const role = Joi.string().min(5);*/

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

// Exportamos nuestros schemas como módulos
module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
