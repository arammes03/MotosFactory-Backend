const express = require('express');
require('dotenv').config();

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
