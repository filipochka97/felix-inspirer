import actionCreator from 'helpers/createApiActionCreator';
import * as api from './subject.api';

export const fetchSubjectsList = () =>
  actionCreator('fetchSubjectsList', api.fetchSubjectsList)();

export const createSubject = (data) => {
  const newSubject = {
    name: data.name || '',
    teacher: data.teacher || '',
  };

  return actionCreator('createSubject', api.createSubject)(newSubject);
};

export const archiveSubject = id =>
  actionCreator('archiveSubject', api.archiveSubject)(id);
