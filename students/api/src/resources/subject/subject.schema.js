const Validator = require('jsonschema').Validator;

const validator = new Validator();

const subjectSchema = {
  id: '/Subject',
  type: 'object',
  properties: {
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
    name: { type: 'string' },
    teacher: { type: 'string' },
  },

  required: ['_id', 'name', 'teacher'],
};

module.exports = obj => validator.validate(obj, subjectSchema);
