 const express = require('express');
 const routerApi = require('./routes/indexRouter');

const app = express();

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


routerApi(app);

// Puerto
//const PORT = process.env.PORT
PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
