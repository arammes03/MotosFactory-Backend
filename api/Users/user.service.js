// Importamos nuestro pool de conexiones
const { pool } = require('../libs/postgres');

// Importamos BOOM para manejar errores
const boom = require('@hapi/boom');

class UserService {
  // CONSTRUCTOR
  constructor() {
    this.pool = pool; // Guardamos el pool de conexiones
    // En caso de error en el pool de conexiones, lanzamos el error con la libreria BOOM
    this.pool.on('error', (error) => {
      throw boom.serverUnavailable(error.message);
    });
  }

  // Función que va a consultar que un usuario exista en la base de datos
  async exists(id) {
    try {
      const query = 'SELECT COUNT(*) FROM users WHERE id = $1'; // Consulta para verificar si el usuario existe
      const values = [id]; // Valores para la consulta

      const res = await pool.query(query, values); // Ejecutamos la consulta añadiendo los valores

      // Obtiene el valor del contador (COUNT(*)) del resultado
      const count = parseInt(res.rows[0].count);

      // Retorna true si el usuario existe (contador mayor que 0), false de lo contrario
      return count > 0;
    } catch (error) {
      // Manejo de errores
      console.error('Error al verificar usuario en la base de datos:', error);
      throw error;
    }
  }

  // Función para consultar todos los usuarios de la base de datos
  async findAll() {
    try {
      const query = 'SELECT * FROM users'; // Consulta SQL
      const rta = await pool.query(query); // Guardamos la respuesta de la consulta
      return rta.rows; // Devolvemos la respuesta de la consulta
    } catch (error) {
      console.log('Error al consultar la base de datos:', error); // Imprimimos el error en consola
      throw error; // Lanza el error para que sea manejado en un nivel superior
    }
  }

  // Función para consultar un usuario de la base de datos
  async findById(id) {
    try {
      this.exists(id).catch((e) => console.log(e.message)); // Lanzamos un error de usuario no encontrado;
      const query = 'SELECT * FROM users WHERE id = $1'; // Consulta SQL
      const rta = await pool.query(query, [id]); // Guardamos la respuesta de la consulta
      return rta.rows[0]; // Devolvemos la respuesta de la consulta
    } catch (error) {
      // En caso de error
      console.log('Error al consultar la base de datos:', error); // Imprimimos el error en consola
      throw error; // Lanza el error para que sea manejado en un nivel superior
    }
  }

  // Función para crear un usuario en la base de datos
  async register(user) {
    try {
      const query =
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'; // Consulta SQL
      const rta = await pool.query(query, [
        user.name,
        user.email,
        user.password,
      ]); // Guardamos la respuesta de la consulta
      return rta.rows[0]; // Devolvemos la respuesta de la consulta
    } catch (error) {
      // En caso de error
      console.log('Error al consultar la base de datos:', error); // Imprimimos el error en consola
      throw error; // Lanza el error para que sea manejado en un nivel superior
    }
  }

  async deleteUser(id) {
    try {
      const query = 'DELETE FROM users WHERE id = $1'; // Consulta SQL
      const rta = await pool.query(query, [id]); // Guardamos la respuesta de la consulta
      return rta.rows[0]; // Devolvemos la respuesta de la consulta
    } catch (error) {
      // En caso de error
      console.log('Error al consultar la base de datos:', error); // Imprimimos el error en consola
      throw error; // Lanza el error para que sea manejado en un nivel superior
    }
  }
}

module.exports = UserService;
