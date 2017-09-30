import actionCreator from 'helpers/createApiActionCreator';
import * as api from './user.api';

export const fetchUsersList = () =>
  actionCreator('fetchUsersList', api.fetchUsersList)();

export const createUser = (data) => {
  const newUser = {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    photoUrl: data.photoUrl,
    photoColors: data.photoColors,
  };

  return actionCreator('createUser', api.createUser)(newUser);
};

export const updateUser = (id, data) => {
  const updatedUser = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    photoUrl: data.photoUrl,
    photoColors: data.photoColors,
  };

  return actionCreator('updateUser', api.updateUser)({ id, updatedUser });
};

export const archiveUser = id =>
  actionCreator('archiveUser', api.archiveUser)(id);

export const uploadPhoto = photoData =>
  api.uploadPhoto(photoData);
