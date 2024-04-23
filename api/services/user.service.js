// Importamos BOOM para manejar errores
const boom = require('@hapi/boom');

// Importamos models de Sequelize
const { models } = require('../libs/sequelize');

class UserService {
  // CONSTRUCTOR
  constructor() {}

  // Función para consultar todos los usuarios de la base de datos
  async findAll() {
    const rta = await models.User.findAll(); // Usamos el modelo de Sequelize para consultar todos los usuarios
    return rta; // Devolvemos los usuarios
  }

  // Función para consultar un usuario de la base de datos
  async findById(id) {
    const user = await models.User.findByPk(id); // Usamos el modelo de Sequelize para consultar un usuario
    if (!user) {
      throw boom.notFound('User not found'); // Si no existe el usuario, lanzamos un error
    }
    return user; // Devolvemos el usuario
  }

  // Función para crear un usuario en la base de datos
  async register(user) {
    const userExist = await models.User.findOne({
      where: { email: user.email },
    }); // Comprobamos que no exista un usuario con el mismo email
    if (userExist) {
      throw boom.conflict('User already exists'); // Si ya existe un usuario con el mismo email, lanzamos un error
    }
    const newUser = await models.User.create(user); // Usamos el modelo de Sequelize para crear un usuario
    return newUser; // Devolvemos el usuario creado
  }

  // Función para actualizar un usuario en la base de datos
  async updateUser(id, userChanges) {
    const user = user.findById(id); // Usamos nuestro findById para consultar un usuario
    const rta = await user.updateUser(userChanges); // Actualizamos el usuario
    return rta; // Devolvemos el usuario actualizado
  }

  // Función para eliminar un usuario de la base de datos
  async deleteUser(id) {
    const user = user.findById(id); // Usamos nuestro findById para consultar un usuario
    await user.destroy(); // Eliminamos el usuario
    return { id }; // Devolvemos el id del usuario eliminado
  }
}

module.exports = UserService;
