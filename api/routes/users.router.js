const express = require('express');
const router = express.Router();

// Importamos el servicio de usuarios
const UserService = require('../services/user.service');
// Creamos unas instancia del servicio de usuarios
const service = new UserService();

// Validators
const validatorHandler = require('../middleware/validator.handler');

// Schemas
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require('../schemas/user.schema');

// Ruta que devuelve todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    const users = await service.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Ruta que devuelve un usuario por su id
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const user = await service.findById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

// Ruta para crear un usuario
router.post(
  '/', // Ruta
  validatorHandler(createUserSchema, 'body'), // Valida los datos del body
  async (req, res, next) => {
    try {
      const body = req.body; // Guardamos los datos del body
      const user = await service.register(body); // Llamamos al servicio y creamos el usuario
      res.json(user);
    } catch (error) {
      next(error); // Lanzamos el error al middleware de errores
    }
  },
);

// Ruta para actualizar un usuario por su id
router.patch(
  '/:id', // Buscamos que se le pase el id del usuario por parametros
  validatorHandler(getUserSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  validatorHandler(updateUserSchema, 'body'), // Una vez validado el id, validamos el contenido del body
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.updateUser(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

// Ruta para eliminar un usuario por su id
router.delete(
  '/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteUser(id);
      res.json({
        user: id,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
);

// EXPORTAMOS EL ROUTER
module.exports = router;
