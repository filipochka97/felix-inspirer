export default {
  getUsersList: state => state.user.usersList,
  getUserById: (state, id) =>
    state.user.usersList.find(user =>
      user._id === id,
    ),
};
