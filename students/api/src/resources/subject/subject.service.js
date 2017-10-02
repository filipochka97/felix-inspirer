const db = require('db');
const validateSchema = require('./subject.schema');

const subjectsService = db.createService('subjects', validateSchema);

const create = async (subjectData) => {
  const subject = Object.assign(
    {
      _id: subjectsService.generateId(),
    },
    subjectData,
  );
  return subjectsService.create(subject);
};

const archive = _id =>
  subjectsService.remove({ _id });

const getList = (query, options) =>
  subjectsService.find(query, options);

const findById = _id => subjectsService.findOne(_id);

module.exports = {
  create,
  archive,
  getList,
  findById,
};
