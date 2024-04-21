const { faker } = require('@faker-js/faker');

const boom = require('@hapi/boom');

class MotorcycleService {
  constructor() {
    this.motorcycles = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.motorcycles.push({
        id: faker.string.uuid(),
        marca: faker.vehicle.manufacturer(),
        modelo: faker.vehicle.model(),
        color: faker.vehicle.color(),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  findAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.motorcycles);
      }, 5000);
    });
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
    this, this.motorcycles.push(newMotorcycle);
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
