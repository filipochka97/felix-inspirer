const requested = (actionName, data) => ({
  ...data,
  type: `${actionName}Requested`,
});

const responded = (actionName, data, payload) => ({
  ...data,
  type: `${actionName}`,
  payload,
});

const failed = (actionName, data, error) => ({
  ...data,
  type: `${actionName}Failed`,
  error: error.payload,
  message: error.message,
});

export default (actionName, apiHandler) => data => (dispatch) => {
  dispatch(requested(actionName, data));

  return apiHandler(data)
    .then(payload => dispatch(responded(actionName, data, payload)))
    .catch((error) => {
      dispatch(failed(actionName, data, error));
      return error;
    });
};
