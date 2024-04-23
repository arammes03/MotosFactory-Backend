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

// Ruta para eliminar un usuario por su id
router.delete(
  '/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.deleteUser(id);
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
