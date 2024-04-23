const express = require('express');
const router = express.Router();

// Importamos el servicio de usuarios
const UserService = require('./user.service');
// Creamos el servicio de usuarios
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await service.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// RUTA PARA REGISTRAR UN USUARIO
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.register(body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// RUTA PARA ELIMINAR UN USUARIO
router.delete('/:id', async (req, res, next) => {
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
});

// EXPORTAMOS EL ROUTER
module.exports = router;
