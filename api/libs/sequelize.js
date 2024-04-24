const { Sequelize } = require('sequelize');

// Importamos la configuración de la base de datos
const { config } = require('../config/config');

// Importamos los modelos
const { setupModels } = require('../models/index');

// Configuramos la conexión a la base de datos
const USER = encodeURIComponent(config.dbUser); // Codificamos el usuario
const PASSWORD = encodeURIComponent(config.dbPassword); // Codificamos la contraseña
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; // Formamos la URL de conexión

// Creamos una instancia de Sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // Dialecto de la base de datos
  logging: console.log,
});

setupModels(sequelize);

sequelize.sync(); // Lee los modelos y crea las tablas en la base de datos

// Exportamos la instancia de Sequelize
module.exports = sequelize;
