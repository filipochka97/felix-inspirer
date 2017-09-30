const initialState = { usersList: [] };

const sortUserList = (a, b) => {
  if (a.firstName.toLowerCase() === b.firstName.toLowerCase()) {
    return (a.lastName.toLowerCase() < b.lastName.toLowerCase()) ? -1 : 1;
  }
  return (a.firstName.toLowerCase() < b.firstName.toLowerCase()) ? -1 : 1;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'fetchUsersList': {
      return {
        ...state,
        usersList: action.payload.results,
        pagesCount: action.payload.pagesCount,
        count: action.payload.count,
      };
    }

    case 'createUser': {
      const usersList = [...state.usersList, action.payload];
      usersList.sort(sortUserList);
      return {
        ...state,
        usersList,
      };
    }

    case 'updateUser': {
      const usersList = state.usersList
        .map(item =>
          (item._id === action.payload._id ? action.payload : item));
      return {
        ...state,
        usersList,
      };
    }

    case 'archiveUser': {
      const usersList = state.usersList
        .filter(item => item._id !== action.payload._id);
      return {
        ...state,
        usersList,
      };
    }

    default:
      return state;
  }
};
