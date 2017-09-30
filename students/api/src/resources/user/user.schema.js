const Validator = require('jsonschema').Validator;

const validator = new Validator();

const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    createdOn: { type: 'date' },
    updatedOn: { type: 'date' },
    status: { type: 'enum', values: ['active', 'archived'] },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: ['string'] },
    photoUrl: { type: ['string', 'null'] },
  },

  required: ['_id', 'firstName', 'lastName', 'email'],
};

module.exports = obj => validator.validate(obj, userSchema);
