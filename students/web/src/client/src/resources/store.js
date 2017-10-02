import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import user from './user/user.reducer';
import subject from './subject/subject.reducer';

const reducer = combineSectionReducers({
  user,
  subject,
});

export default createStore(reducer, compose(applyMiddleware(thunk)));
