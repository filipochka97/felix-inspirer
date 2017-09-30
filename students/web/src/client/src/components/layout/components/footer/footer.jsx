import React from 'react';

import './footer.styles.pcss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__copyright copyright">
          <img src="static/images/felix.png" alt="Felix logo" />
        </div>
        <div className="footer__about about">
          <p className="about__title">About Felix</p>
          <p className="about__text">
            Hello! I'm Felix, let's be friends:) Likely you are the starosta.
            Congratulations!! I want to make your life easier and richer in adventure,
            so to reach this your group and you should pass laboratory works in time,
            hence your study session will go without problems.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
