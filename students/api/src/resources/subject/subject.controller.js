const subjectService = require('./subject.service');
const subjectCreateValidator = require('./validators/subjectCreate.validator');
const subjectQueryValidator = require('./validators/subjectQuery.validator');

module.exports.create = async (ctx) => {
  const data = await subjectCreateValidator(ctx);
  if (!data.isValid) {
    return;
  }

  const subjectData = {
    name: data.name,
    teacher: data.teacher,
  };

  ctx.body = await subjectService.create(subjectData);
};

module.exports.archive = async (ctx) => {
  const { results } = await subjectService.archive(ctx.params.id);
  ctx.body = results[0];
};

module.exports.getList = async (ctx) => {
  const data = await subjectQueryValidator(ctx);
  if (!data.isValid) {
    return;
  }

  const query = {};

  const options = {
    page: data.page,
    perPage: data.perPage,
    sort: { firstName: 1, lastName: 1 },
  };

  const subjectsList = await subjectService.getList(query, options);

  ctx.body = subjectsList;
};

module.exports.findById = async (ctx) => {
  ctx.body = await subjectService.findById(ctx.params.id);
};
