const { Sequelize } = require('sequelize');

// Importamos la configuración de la base de datos
const { config } = require('../config/config');

// Configuramos la conexión a la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Creamos una instancia de Sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

module.exports = sequelize;
