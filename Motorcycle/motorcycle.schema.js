// Importación JOI para validación de datos
const Joi = require('joi');

// Definición de nuestras variables de validación
const id = Joi.string().uuid();
const marca = Joi.string().alphanum().messages({
  'string.base': `"La marca debe ser de tipo texto"`,
  'string.empty': `"La marca no puede estar vacía"`,
});
const modelo = Joi.string().messages({
  'string.base': `"El modelo debe ser de tipo texto"`,
  'string.empty': `"El modelo no puede estar vacío"`,
});
const color = Joi.string().alphanum();
const image = Joi.string().uri();

//
const createMotorcycleSchema = Joi.object({
  marca: marca.required(),
  modelo: modelo.required(),
  image,
  color,
});

const updateMotorcycleSchema = Joi.object({
  marca: marca,
  modelo: modelo,
  image: image,
  color: color,
});

const getMotorcycleSchema = Joi.object({
  id: id.required(),
});

// Exportamos nuestros schemas como módulos
module.exports = {
  createMotorcycleSchema,
  updateMotorcycleSchema,
  getMotorcycleSchema,
};
