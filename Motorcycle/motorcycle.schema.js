// Importación JOI para validación de datos
const Joi = require('joi');

// Definición de nuestras variables de validación
const id = Joi.string().uuid();
const manufacturer = Joi.string().alphanum();
const model = Joi.string().alphanum();
const cc = Joi.number().integer();

//
const createMotorcycleSchema = Joi.object({
  manufacturer: manufacturer.required(),
  model: model.required(),
  cc,
});

const updateMotorcycleSchema = Joi.object({
  manufacturer: manufacturer,
  model: model,
  cc,
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
