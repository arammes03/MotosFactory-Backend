const express = require('express');

const motorcyclesRouter = require('./motorcyclesRouter')
const usersRouter = require('./usersRouter')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/motorcycles', motorcyclesRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
