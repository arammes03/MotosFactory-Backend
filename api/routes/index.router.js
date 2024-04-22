const express = require('express');

const motorcyclesRouter = require('../Motorcycle/motorcycle.router')
const usersRouter = require('../Users/user.router')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/motorcycles', motorcyclesRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
