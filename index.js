const express = require('express');
require('dotenv').config();

// API ROUTES
const routerApi = require('./routes/index.router');

// SERVER CREATION
const app = express();

// ALLOWS WRITING AND READING
app.use(express.json());

// ROUTES
routerApi(app);

// SERVER PORT
PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
