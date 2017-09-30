const moment = require('moment');
const baseValidator = require('resources/base.validator');
const userService = require('../user.service');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('firstName')
    .trim()
    .len(2, 50, 'Firstname must be longer than 2 letters');
  ctx.checkBody('lastName')
    .trim()
    .len(2, 50, 'Lastname must be longer than 2 letters');
  ctx.checkBody('photoUrl')
    .optional()
    .isUrl('Photo must be a URL');
  ctx.checkBody('email')
    .isEmail('Email address is invalid');

  if (ctx.errors.length) {
    return false;
  }

  const query = {
    email: `${ctx.request.body.email}`,
  };

  const isUserExists = await userService.isUserExists(query);

  if (isUserExists) {
    ctx.errors.push({ '/email': 'User already exists' });
    return false;
  }

  return {
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    email: ctx.request.body.email,
    photoUrl: ctx.request.body.photoUrl,
    photoColors: ctx.request.body.photoColors,
  };
});
