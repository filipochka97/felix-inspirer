export default {
  getUsersList: state => state.usersList,
  getUserById: (state, id) =>
    state.usersList.find(user =>
      user._id === id,
    ),
};
