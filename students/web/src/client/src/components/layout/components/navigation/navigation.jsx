import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../logo';

import './navigation.styles';

const Navigation = () => {
  return (
    <nav className="nav">
      <Logo />
      <NavLink
        to="/students"
        className="nav__link"
        activeClassName="nav__link--selected"
      >
        Students
      </NavLink>
      <NavLink
        to="/subjects"
        className="nav__link"
        activeClassName="nav__link--selected"
      >
        Subjects
      </NavLink>
    </nav>
  );
};

export default Navigation;
