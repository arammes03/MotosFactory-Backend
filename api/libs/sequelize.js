const { Sequelize } = require('sequelize');

// Importamos la configuración de la base de datos
const { config } = require('../config/config');

// Importamos los modelos
const { setupModels } = require('../models/index');

// Configuramos la conexión a la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Creamos una instancia de Sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

// Sincronizamos la base de datos
sequelize.sync();

module.exports = sequelize;
