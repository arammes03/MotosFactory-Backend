const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async findAll() {
    try {
      const client = await getConnection();
      const rta = await client.query('SELECT * FROM users');
      return rta.rows;
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      throw error; // Lanza el error para que sea manejado en un nivel superior
    }
  }
}

module.exports = UserService;
