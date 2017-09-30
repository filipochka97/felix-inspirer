require('app-module-path').addPath(__dirname);
global.logger = require('logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const logger = global.logger;
const config = require('config');
const Koa = require('koa');

const app = new Koa();
require('./config/koa')(app);

app.listen(config.port, async () => {
  logger.warn(`Api server listening on ${config.port}, in ${process.env.NODE_ENV} mode`);
});

module.exports = app;
