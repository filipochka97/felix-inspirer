const initialState = { subjectsList: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'fetchSubjectsList': {
      return {
        ...state,
        subjectsList: action.payload.results,
        pagesCount: action.payload.pagesCount,
        count: action.payload.count,
      };
    }

    case 'createSubject': {
      const subjectsList = [...state.subjectsList, action.payload];
      return {
        ...state,
        subjectsList,
      };
    }

    case 'archiveSubject': {
      const subjectsList = state.subjectsList
        .filter(item => item._id !== action.payload._id);
      return {
        ...state,
        subjectsList,
      };
    }

    default:
      return state;
  }
};
