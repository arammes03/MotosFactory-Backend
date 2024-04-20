const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server');
})

app.listen(port, () => {
  console.log('Corriendo en puerto ' + port);
});
