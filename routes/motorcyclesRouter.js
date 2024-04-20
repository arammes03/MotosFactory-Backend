const express = require('express');
const { faker }= require('@faker-js/faker')

const router = express.Router();

router.get('/', (req, res) => {
  const motos = [];
  const {size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    motos.push({
      marca: faker.vehicle.manufacturer(),
      modelo: faker.vehicle.model(),
      color: faker.vehicle.color(),
      image: faker.image.url(),
    })
  }
  res.json(motos);
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

router.get('/filter', (req, res) => {
  res.send('Soy un filtro manito')
})


router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    marca: 'Yamaha',
    modelo: 'YZF-R7'
  })
})

module.exports = router;
