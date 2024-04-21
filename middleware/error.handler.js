// Funcion que nos hará llegar a un middleware de tipo error
function logErrors(error, req, res, next) {
  console.log('logErrors middleware');
  console.error(error); // muestra el error en la consola del servidor
  next(error); //importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
}

// Función que crea el formato para devolverlo al cliente que se complementa con la función anterior
function errorHandler(error, req, res, next) {
  /*
   ! NEXT HAY QUE PONERLO SI O SI PARA QUE DETECTE QUE ES UN MIDDLEWARE DE ERROR
  */
  console.log('errorHandler middleware');
  res.status(500).json({
    message: error.message, // mostrar al cliente el mensaje de error
    stack: error.stack, //mostrar info del error
  });
}

// Funcion que maneja los errores a través de la libreria boom
function boomErrorHandler(error, req, res, next) {
  // if que controla que el error es de tipo boom
  if (error.isBoom) {
    const { output } = error; // Leemos la salida del error y la guardamos
    res.status(output.statusCode).json(output.payload); // Mostramos la información del error
  } else next(error); // Si no es de tipo boom entonces lo pasamos al siguiente middleware de error
  console.log('errorHandler middleware');
}

// Exportamos nuestros middlewares como modulos
module.exports = { logErrors, errorHandler, boomErrorHandler };
