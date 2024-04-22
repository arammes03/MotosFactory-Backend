const express = require('express');
require('dotenv').config();

// CORS
const cors = require('cors');

// RUTAS API
const routerApi = require('./routes/index.router');

// MIDDLEWARES
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middleware/error.handler');

// CREACIÓN DEL SERVIDOR
const app = express();

// PERMITE LECTURA Y ESCRITURA DEL JSON
app.use(express.json());

// CONFIGURACIÓN CORS
/*
   Definimos el origen permitido para las solicitudes
  ! "*" es para cualquier origen (MENOS SEGURO)
  */
const whiteList = ['http://127.0.0.1:5500']; // Lista de dominios permitidos

var corsOptions = {
  // Vamos a comprobar que ese dominio de origen está en la lista de permitidos
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      // Si está en la lista
      callback(null, true); // No hay error, el origen es permitido
    } else {
      // En caso de no estar en la lista
      callback(new Error('Acceso no permitido')); // Ese dominio no tiene acceso y muestra un error
    }
  },
};

// Cargamos la configuración de CORS en la app
app.use(cors(corsOptions));

// RUTAS DE LA APP
routerApi(app);

/*
  CONTROLADOR DE ERRORES
  !SIEMPRE DESPUÉS DEL ROUTING
*/
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// PUERTO DEL SERVIDOR
PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
