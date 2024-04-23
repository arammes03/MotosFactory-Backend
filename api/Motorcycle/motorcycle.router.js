// EXPRESS JS
const express = require('express');
const router = express.Router();

// SERVICES
const MotorcycleService = require('./motorcycle.service');
const service = new MotorcycleService();

// VALIDATORS
const validatorHandler = require('../middleware/validator.handler');

// SCHEMAS
const {
  createMotorcycleSchema,
  updateMotorcycleSchema,
  getMotorcycleSchema,
} = require('./motorcycle.schema');

// RUTA QUE DEVUELVE TODAS LAS MOTOCICLETAS
router.get('/', async (req, res) => {
  const motorcycles = await service.findAll(); // Llamamos a la función de nuestro servicio que muestra todas las motocicletas
  res.status(200).json(motorcycles);
});

// RUTA QUE DEVUELVE UNA MOTOCICLETA
router.get(
  '/:id', // Buscamos que se le pase el id de la motocicleta por parametros
  validatorHandler(getMotorcycleSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const motorcycle = await service.findOne(id);
      res.json(motorcycle);
    } catch (error) {
      next(error);
    }
  },
);

// RUTA CREAR MOTOCICLETA
router.post(
  '/',
  validatorHandler(createMotorcycleSchema, 'body'),
  async (req, res) => {
    const motorcycle = req.body;
    const newMotorcycle = await service.create(motorcycle);
    res.status(201).json({
      message: 'Motorcycle created successfully',
      data: newMotorcycle,
    });
  },
);

// ACTUALIZACIÓN PARCIAL DE LA MOTOCICLETA
router.patch(
  '/:id', // Buscamos que se le pase el id de la motocicleta por parametros
  validatorHandler(getMotorcycleSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  validatorHandler(updateMotorcycleSchema, 'body'), // Una vez validado el id, validamos el contenido del body
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const motorcycle = await service.update(id, body);
      res.json(motorcycle);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE FUNCTION
router.delete(
  '/:id', // Buscamos que se le pase el id de la motocicleta por parametros
  validatorHandler(getMotorcycleSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const motorcycle = await service.delete(id);
      res.json(motorcycle);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
