import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Users from './users';
import Subjects from './subjects';

class Routes extends Component {
  render() {
    return (
      <div className="main__list">
        <Route exact path="/" component={() => <Redirect to="/students" />} />
        <Route path="/students" component={Users} />
        <Route path="/subjects" component={Subjects} />
      </div>
    );
  }
}

export default Routes;
