const mount = require('koa-mount');
const serve = require('koa-static');
const userResource = require('resources/user/public');
const subjectResource = require('resources/subject');
const config = require('config');

module.exports = (app) => {
  app.use(mount('/photo', serve(config.pathToUpload)));
  app.use(mount('/api/user', userResource));
  app.use(mount('/api/subject', subjectResource));
};
