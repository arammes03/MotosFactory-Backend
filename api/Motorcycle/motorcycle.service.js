// Libreria FAKER que aporta datos aleatorios
const { faker, da } = require('@faker-js/faker');

// Importamos el pool de conexiones a la base de datos
const { pool } = require('../libs/postgres');

// Importamos sequelize
const { models } = require('../libs/sequelize');

// Importamos BOOM para manejar errores
const boom = require('@hapi/boom');

class MotorcycleService {
  constructor() {}

  async findAll() {
    const rta = await models.Motorbike.findAll();
    return rta;
  }

  async findOne(id) {
    // const name = this.getTotal(); /* PROBANDO MIDDLEWARE */
    const motorcycle = this.motorcycles.find(
      (motorcycle) => motorcycle.id === id,
    );
    if (!motorcycle) {
      throw boom.notFound('Motorcycle not found');
    }
    if (motorcycle.isBlock) {
      throw boom.conflict('Motorcycle is blocked');
    }
    return motorcycle;
  }

  create(motorcycle) {
    const newMotorcycle = {
      id: faker.string.uuid(),
      ...motorcycle,
    };
    this.motorcycles.push(newMotorcycle);
    return newMotorcycle;
  }

  async update(id, changes) {
    const index = this.motorcycles.findIndex(
      (motorcycle) => motorcycle.id === id,
    );
    if (index === -1) {
      throw boom.notFound('Motorcycle not found');
    }
    const motorcycle = this.motorcycles[index];
    this.motorcycles[index] = {
      ...motorcycle,
      ...changes,
    };
    return {
      message: 'Motorcycle updated successfully',
      id: this.motorcycles[index],
    };
  }

  async delete(id) {
    const index = this.motorcycles.findIndex(
      (motorcycle) => motorcycle.id === id,
    );
    if (index === -1) {
      throw boom.notFound('Motorcycle not found');
    }
    this.motorcycles.splice(index, 1);
    return {
      message: 'Motorcycle deleted successfully',
      id,
    };
  }
}

module.exports = MotorcycleService;
