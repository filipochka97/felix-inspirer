import React from 'react';
import Navigation from '../navigation';
import './header.styles.pcss';

const Header = () => (
  <header className="header">
    <div className="header__navigation">
      <Navigation />
    </div>
  </header>
);

export default Header;
