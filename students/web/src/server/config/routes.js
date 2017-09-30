const path = require('path');
const config = require('config');
const indexRouter = require('koa-router')();
const fs = require('fs');

const staticPath = path.join(__dirname, './../../client/src/static');
let staticFileNames;
let mainJS;
let mainCSS;

if (process.env.NODE_ENV !== 'development') {
  staticFileNames = fs.readdirSync(staticPath);
  mainJS = staticFileNames.find(fileName => path.extname(fileName) === '.js');
  mainCSS = staticFileNames.find(fileName => path.extname(fileName) === '.css');
}

indexRouter.get(/^((?!\.).)*$/, async (ctx) => {
  const data = {
    config: {
      jwtSecret: config.jwtSecret,
      baseApiUrl: config.baseApiUrl,
    },
    mainCSS: `/static/${mainCSS}`,
    mainJS: `/static/${mainJS || 'main.js'}`,
  };

  return ctx.render('index', data);
});

module.exports = indexRouter.routes();
