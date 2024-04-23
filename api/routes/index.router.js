const express = require('express');

const motorbikesRouter = require('./motorbikes.router');
const usersRouter = require('./users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/motorbikes', motorbikesRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
