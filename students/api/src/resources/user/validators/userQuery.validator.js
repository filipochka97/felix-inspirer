const baseValidator = require('resources/base.validator');

module.exports = ctx => baseValidator(ctx, () => {
  ctx.checkQuery('page')
    .optional()
    .toInt();
  ctx.checkQuery('perPage')
    .optional()
    .toInt();

  return {
    page: ctx.query.page,
    perPage: ctx.query.perPage,
  };
});
