// Libreria FAKER que aporta datos aleatorios
const { faker } = require('@faker-js/faker');

// Importamos el pool de conexiones a la base de datos
const { pool } = require('../libs/postgres');

// Importamos sequelize
const { models } = require('../libs/sequelize');

// Importamos BOOM para manejar errores
const boom = require('@hapi/boom');

class motorbikeService {
  constructor() {}

  async findAll() {
    const rta = await models.Motorbike.findAll();
    return rta;
  }

  async findOne(id) {
    // const name = this.getTotal(); /* PROBANDO MIDDLEWARE */
    const motorbike = this.motorbikes.find((motorbike) => motorbike.id === id);
    if (!motorbike) {
      throw boom.notFound('Motorbike not found');
    }
    return motorbike;
  }

  create(motorbike) {
    const newmotorbike = {
      id: faker.string.uuid(),
      ...motorbike,
    };
    this.motorbikes.push(newmotorbike);
    return newmotorbike;
  }

  async update(id, changes) {
    const index = this.motorbikes.findIndex((motorbike) => motorbike.id === id);
    if (index === -1) {
      throw boom.notFound('Motorbike not found');
    }
    const motorbike = this.motorbikes[index];
    this.motorbikes[index] = {
      ...motorbike,
      ...changes,
    };
    return {
      message: 'Motorbike updated successfully',
      id: this.motorbikes[index],
    };
  }

  async delete(id) {
    const index = this.motorbikes.findIndex((motorbike) => motorbike.id === id);
    if (index === -1) {
      throw boom.notFound('Motorbike not found');
    }
    this.motorbikes.splice(index, 1);
    return {
      message: 'Motorbike deleted successfully',
      id,
    };
  }
}

module.exports = motorbikeService;
