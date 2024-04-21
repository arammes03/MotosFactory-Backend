// EXPRESS JS
const express = require('express');
const router = express.Router();

// SERVICES
const MotorcycleService = require('./motorcycle.service');
const service = new MotorcycleService();

// ROUTE RETURN ALL MOTORCYCLES
router.get('/', (req, res) => {
  const motorcycles = service.findAll();
  res.status(200).json(motorcycles);
  /*
  res.json([
    {
      marca: 'Yamaha',
      modelo: 'YZF-R125'
    },
    {
      marca: 'Yamaha',
      modelo: 'YZF-R15'
    },
    {
      marca: 'Yamaha',
      modelo: 'YZF-R3'
    },
    {
      marca: 'Yamaha',
      modelo: 'YZF-R6'
    },
    {
      marca: 'Yamaha',
      modelo: 'YZF-R7'
    },
    {
      marca: 'Yamaha',
      modelo: 'YZF-R1'
    },
    {
      marca: 'Kawasaki',
      modelo: 'ZX-400RR'
    },
    {
      marca: 'Kawasaki',
      modelo: 'ZX-6R'
    },
    {
      marca: 'Kawasaki',
      modelo: 'ZX-10R'
    },
    {
      marca: 'Suzuki',
      modelo: 'GSX600R'
    },
  ]);
  */
})

// ROUTE RETURN ONE MOTORCYCLE
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const motorcycle = service.findOne(id);
  res.json(motorcycle);
});

// ROUTE CREATE MOTORCYCLE
router.post('/', (req, res) => {
  const motorcycle = req.body;
  const newMotorcycle = service.create(motorcycle);
  res.status(201).json({
    message: "Motorcycle created successfully",
    data: newMotorcycle
  })
})

// UPDATE PARCIALTY
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const motorcycle = service.update(id, body);
  res.json(motorcycle);
})

// DELETE FUNCTION
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const motorcycle = service.delete(id);
  res.json(motorcycle);
})

module.exports = router;
