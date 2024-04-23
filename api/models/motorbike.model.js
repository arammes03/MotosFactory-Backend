const { Model, DataTypes, Sequelize } = require('sequelize');

const MOTORBIKE_TABLE = 'motorbikes';

const MotorbikeSchema = {
  id: {
    type: DataTypes.INTEGER, // Tipo de dato
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Autoincremental
    allowNull: false, // Que no sea nulo
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Motorbike extends Model {
  static associate() {
    // Aquí se definen las relaciones entre las tablas
  }

  static config(sequelize) {
    // Aquí se define la configuración de la tabla
    return {
      sequelize,
      tableName: MOTORBIKE_TABLE, // Nombre de la tabla en la BBDD
      modelName: 'Motorbike', // Nombre de la clase
      timestamps: false, // No queremos que se creen las columnas de createdAt y updatedAt
    };
  }
}

module.exports = { MOTORBIKE_TABLE, MotorbikeSchema, Motorbike };
