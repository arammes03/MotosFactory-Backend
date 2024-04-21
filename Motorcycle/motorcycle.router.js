// EXPRESS JS
const express = require('express');
const router = express.Router();

// SERVICES
const MotorcycleService = require('./motorcycle.service');
const service = new MotorcycleService();

// ROUTE RETURN ALL MOTORCYCLES
router.get('/', async (req, res) => {
  const motorcycles = await service.findAll();
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
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const motorcycle = await service.findOne(id);
  res.json(motorcycle);
});

// ROUTE CREATE MOTORCYCLE
router.post('/', async (req, res) => {
  const motorcycle = req.body;
  const newMotorcycle = await service.create(motorcycle);
  res.status(201).json({
    message: "Motorcycle created successfully",
    data: newMotorcycle
  })
})

// UPDATE PARCIALTY
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const motorcycle = await service.update(id, body);
    res.json(motorcycle);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
})

// DELETE FUNCTION
router.delete('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const motorcycle = await service.delete(id);
  res.json(motorcycle);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
})

module.exports = router;
