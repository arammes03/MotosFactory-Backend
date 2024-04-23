// Librería que nos permite conectarnos a la base de datos
const { Client } = require('pg');

// Librería que nos permite hacer un conjunto de conexiones a la base de datos
const { Pool } = require('pg');

// Importamos la configuración de la base de datos
const { config } = require('../config/config');

// Función que hará la conexión a la base de datos
async function getConnection() {
  // Creamos el cliente de la conexión a la base de datos
  const client = new Client({
    host: 'localhost', // Dirección del servidor
    port: 5432, // Puerto de conexión
    user: 'admin', // Usuario de la base de datos
    password: 'admin123', // Contraseña del usuario de la base de datos
    database: 'MotosFactoryDB', // Nombre de la base de datos
  });
  await client.connect(); // Realizamos la conexión a la base de datos
  return client; // Devolvemos el cliente de la conexión a la base de datos para poder hacer consultas
}

// Configuramos la conexión a la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Creamos el pool de conexiones
const pool = new Pool({
  connectionString: URI,
});

// Exportamos la función de conexión a la base de datos
module.exports = { getConnection, pool };
