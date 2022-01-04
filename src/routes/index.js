const authRouter = require('./auth');
const productsRouter = require('./products');

module.exports.init = (app) => {
  app.use('/auth', authRouter);
  app.use('/products', productsRouter);
};