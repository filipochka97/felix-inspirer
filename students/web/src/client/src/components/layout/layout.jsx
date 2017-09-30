import React, { PureComponent } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Routes from '../routes';
import './layout.styles';

class Layout extends PureComponent {
  render() {
    return (
      <main className="main">
        <Header />
        <Routes />
        <Footer />
      </main>
    );
  }
}

export default Layout;
