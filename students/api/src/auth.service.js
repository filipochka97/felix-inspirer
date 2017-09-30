const jwt = require('jsonwebtoken');
const config = require('config');

const logger = global.logger;

const checkAuthToken = async (ctx, next) => {
  const authorization = ctx.headers.authorization || '';
  const tokenParts = authorization.split(' ');
  if (!authorization || tokenParts.length !== 2) {
    ctx.status = 401;
  }

  const token = tokenParts[1];
  if (token === config.jwtSecret) {
    await next();
  } else {
    ctx.status = 401;
  }
};

const createAuthToken = ({ userId, email, isAdmin }) => {
  const payload = {
    _id: userId,
    email,
    isAdmin,
  };

  return jwt.sign(payload, config.jwtSecret, {});
};

const decodeToken = (token) => {
  let res;

  try {
    res = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    logger.warn('Invalid json web token', err);
  }

  return res;
};

const checkAuthentication = token => decodeToken(token);

module.exports = {
  checkAuthToken,
  createAuthToken,
  decodeToken,
  checkAuthentication,
};
