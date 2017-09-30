const path = require('path');
const cors = require('kcors');
const requestLogger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
const webpack = require('webpack');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const handlebars = require('handlebars');

const logger = global.logger;

const routes = require('./routes');

handlebars.registerHelper('json', context => JSON.stringify(context));

const configureWebpack = (app) => {
  /* eslint-disable */
  const { devMiddleware, hotMiddleware } = require('../koa-webpack-middleware/middleware');
  const webpackOptions = require('../../client/src/webpack.dev.config');
  /* eslint-enable */

  const webpackMiddlewareOptions = {
    noInfo: false,
    quiet: false,
    hot: true,
    publicPath: webpackOptions.output.publicPath,
    stats: {
      colors: true,
    },
  };

  app.use(devMiddleware(webpack(webpackOptions), webpackMiddlewareOptions));
  app.use(hotMiddleware(webpack(webpackOptions)));
};

module.exports = (app) => {
  app.use(cors());

  if (process.env.NODE_ENV === 'development') {
    configureWebpack(app);
  }

  app.use(requestLogger());
  app.use(bodyParser());

  const viewsPath = path.join(__dirname, './../../client/src');
  app.use(
    views(viewsPath, {
      default: 'html',
      map: { html: 'handlebars' },
      options: {
        helpers: {
          json: ctx => JSON.stringify(ctx),
        },
      },
    }),
  );

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      this.status = err.status || 500;
      this.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
    }
  });

  app.use(routes);
  const pathToStatic = path.join(__dirname, './../../client/src/static');
  app.use(mount('/static', serve(pathToStatic)));
};
