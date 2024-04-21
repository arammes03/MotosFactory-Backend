// Importamos BOOM para manejar los errores
const boom = require('@hapi/boom');

/*
* MIDDLEWARE DINÁMICO
Función que evaluará de cada petición, de una propiedad en específico (body, params, query) para aplicar el schema
*/
function validatorHandler(schema, property) {
  // Clousures
  return (req, res, next) => {
    const data = req[property]; // Pueden venir en el body, params o query
    const { error } = schema.validate(data, { abortEarly: false }); // validamos los datos con el schema y abortEarly para que envie todos los errores al mismo tiempo
    // Manejamos si manda algún error al validar el schema
    if (error) {
      next(boom.badRequest(error));
    }
    next(); // Si no hay errores entonces pasamos al siguiente middleware
  };
}

module.exports = validatorHandler;
