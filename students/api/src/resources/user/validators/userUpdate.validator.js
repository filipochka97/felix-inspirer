const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('firstName')
    .optional()
    .trim()
    .len(2, 30, 'Firstname must be longer than 2 letters');
  ctx.checkBody('lastName')
    .optional()
    .trim()
    .len(2, 30, 'Lastname must be longer than 2 letters');
  ctx.checkBody('/contacts/email', true).first()
    .optional()
    .isEmail('Email address is invalid');

  return {
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    email: ctx.request.body.email,
    photoUrl: ctx.request.body.photoUrl,
    photoColors: ctx.request.body.photoColors,
  };
});
