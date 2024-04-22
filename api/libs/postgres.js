// Librería que nos permite conectarnos a la base de datos
const { Client } = require('pg');

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

// Exportamos la función de conexión a la base de datos
module.exports = getConnection;
