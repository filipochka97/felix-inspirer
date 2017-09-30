import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user/user.reducer';

export default createStore(user, applyMiddleware(thunk));
