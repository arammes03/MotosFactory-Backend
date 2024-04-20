const motorcyclesRouter = require('./motorcyclesRouter')
const usersRouter = require('./usersRouter')

function routerApi(app) {
  app.use('/api/v1/motorcycles', motorcyclesRouter);
  app.use('/api/v1/users', usersRouter);
}

module.exports = routerApi;
