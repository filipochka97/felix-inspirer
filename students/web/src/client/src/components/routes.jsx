import React from 'react';
import { Route } from 'react-router-dom';

import Users from './users';

const Routes = () => {
  return (
    <div className="main__list">
      <Route path="/" component={Users} />
    </div>
  );
};

export default Routes;
