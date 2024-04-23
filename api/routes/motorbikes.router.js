// EXPRESS JS
const express = require('express');
const router = express.Router();

// Importamos el servicio de motorbike
const motorbikeService = require('../services/motorbike.service');
// Creamos una instancia del servicio de motorbike
const service = new motorbikeService();

// VALIDATORS
const validatorHandler = require('../middleware/validator.handler');

// SCHEMAS
const {
  createmotorbikeSchema,
  updatemotorbikeSchema,
  getmotorbikeSchema,
} = require('../schemas/motorbike.schema');

// RUTA QUE DEVUELVE TODAS LAS MOTOCICLETAS
router.get('/', async (req, res) => {
  const motorbikes = await service.findAll(); // Llamamos a la función de nuestro servicio que muestra todas las motocicletas
  res.status(200).json(motorbikes);
});

// RUTA QUE DEVUELVE UNA MOTOCICLETA
router.get(
  '/:id', // Buscamos que se le pase el id de la motocicleta por parametros
  validatorHandler(getmotorbikeSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const motorbike = await service.findOne(id);
      res.json(motorbike);
    } catch (error) {
      next(error);
    }
  },
);

// RUTA CREAR MOTOCICLETA
router.post(
  '/',
  validatorHandler(createmotorbikeSchema, 'body'),
  async (req, res) => {
    const motorbike = req.body;
    const newmotorbike = await service.create(motorbike);
    res.status(201).json({
      message: 'motorbike created successfully',
      data: newmotorbike,
    });
  },
);

// ACTUALIZACIÓN PARCIAL DE LA MOTOCICLETA
router.patch(
  '/:id', // Buscamos que se le pase el id de la motocicleta por parametros
  validatorHandler(getmotorbikeSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  validatorHandler(updatemotorbikeSchema, 'body'), // Una vez validado el id, validamos el contenido del body
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const motorbike = await service.update(id, body);
      res.json(motorbike);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE FUNCTION
router.delete(
  '/:id', // Buscamos que se le pase el id de la motocicleta por parametros
  validatorHandler(getmotorbikeSchema, 'params'), // Usamos nuestro middleware de validación para validar el id de los parametros
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const motorbike = await service.delete(id);
      res.json(motorbike);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
