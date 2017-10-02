import * as api from 'helpers/api.client';

export const fetchSubjectsList = () =>
  api.get('api/subject');

export const createSubject = newSubject =>
  api.post('api/subject', {}, newSubject);

export const archiveSubject = id =>
  api.put(`api/subject/${id}/archive`);
