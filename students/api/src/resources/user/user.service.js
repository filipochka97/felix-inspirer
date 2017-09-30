const db = require('db');
const validateSchema = require('./user.schema');
const securityUtil = require('security.util');

const usersService = db.createService('users', validateSchema);

const create = async (userData) => {
  const user = Object.assign(
    {
      _id: usersService.generateId(),
    },
    userData,
  );
  return usersService.create(user);
};

const update = (_id, updateData) =>
  usersService.update({ _id }, user => Object.assign(user, updateData));

const archive = _id =>
  usersService.update({ _id }, user =>
    Object.assign(user, { status: 'archived' }),
  );

const getList = (query, options) =>
  usersService.find(query, options);

const findById = _id => usersService.findOne(_id);

const isUserExists = query => usersService.exists(query);

const getTeamMembersByIDArray = teamIDs => (
  usersService.find({
    _id: {
      $in: teamIDs,
    },
  })
);

const getContactByEmail = async (contactEmail) => {
  const user = await usersService.findOne({ email: contactEmail });
  if (!user) {
    return false;
  }

  return user;
};

module.exports = {
  create,
  update,
  archive,
  getList,
  findById,
  isUserExists,
  getTeamMembersByIDArray,
  getContactByEmail,
};
