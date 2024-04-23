// Este fichero se encarga de mandar la conexión hacia los modelos y asi poder hacer todo el mapeo de los datos
// Importamos los modelos
const { Motorbike, MotorbikeSchema } = require('./motorbike.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  Motorbike.init(MotorbikeSchema, Motorbike.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
}

module.exports = { setupModels };
