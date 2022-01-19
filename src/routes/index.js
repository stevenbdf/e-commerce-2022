const authRouter = require('./auth');
const productsRouter = require('./products');
const usersRouter = require('./users');

module.exports.init = (app) => {
  app.use('/auth', authRouter);
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
};