const express = require('express');
const { faker, fa }= require('@faker-js/faker')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server');
})

app.get('/motos', (req, res) => {
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

app.get('/motos/filter', (req, res) => {
  res.send('Soy un filtro manito')
})


app.get('/motos/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    marca: 'Yamaha',
    modelo: 'YZF-R7'
  })
})

app.get('/marcas', (req, res) => {
  res.json([
    {
      marca: 'Yamaha',
      modelos: []
    },
    {
      marca: 'Suzuki',
      modelos: []
    },
    {
      marca: 'Kawasaki',
      modelos: []
    }
  ])
})

app.get('/marca/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    marca: 'Honda'
  })
})

app.get('/marcas/:marcaId/modelos/:modeloId', (req, res) => {
  const { marcaId, modeloId } = req.params;
  res.json({
    marcaId,
    modeloId
  },)
})

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Alfonso',
    surname: 'Ramirez',
    age: 20,
    role: 'Full Stack Developer'
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros')
  }
})

app.listen(port, () => {
  console.log('Corriendo en puerto ' + port);
});
