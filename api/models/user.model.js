const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER, // Tipo de dato
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Autoincremental
    allowNull: false, // Que no sea nulo
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class User extends Model {
  static associate() {
    // Aquí se definen las relaciones entre las tablas
  }

  static config(sequelize) {
    // Aquí se define la configuración de la tabla
    return {
      sequelize,
      tableName: USER_TABLE, // Nombre de la tabla en la BBDD
      modelName: 'User', // Nombre de la clase
      timestamps: false, // No queremos que se creen las columnas de createdAt y updatedAt
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
