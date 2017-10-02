export default {
  getSubjectsList: state => state.subject.subjectsList,
  getSubjectById: (state, id) =>
    state.subject.subjectsList.find(subject =>
      subject._id === id,
    ),
};
