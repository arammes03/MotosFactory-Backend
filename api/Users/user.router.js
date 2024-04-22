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

module.exports = router;
