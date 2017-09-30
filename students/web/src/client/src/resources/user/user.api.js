import * as api from 'helpers/api.client';

export const fetchUsersList = () =>
  api.get('api/user');

export const createUser = newUser =>
  api.post('api/user', {}, newUser);

export const updateUser = ({ id, updatedUser }) =>
  api.put(`api/user/${id}`, {}, updatedUser);

export const archiveUser = id =>
  api.put(`api/user/${id}/archive`);

export const uploadPhoto = photoData =>
  api.file('api/user/photo', {}, photoData);
