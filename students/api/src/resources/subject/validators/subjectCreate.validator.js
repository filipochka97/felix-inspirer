const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, async () => {
  ctx.checkBody('name')
    .trim()
    .len(2, 50, 'Subject name must be longer than 2 letters');
  ctx.checkBody('teacher')
    .trim()
    .len(2, 50, 'Teacher\'s name must be longer than 2 letters');

  if (ctx.errors.length) {
    return false;
  }

  return {
    name: ctx.request.body.name,
    teacher: ctx.request.body.teacher,
  };
});
