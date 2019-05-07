import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config';

import './footer.css';

const Footer = props => (
  <div className="footer">
    <Link to="/" className="logo">
      <img src="/images/nba_logo.png" alt="nba logo" />
    </Link>
    <div className="right">@NBA {CURRENT_YEAR} All right reserved.</div>
  </div>
);

export default Footer;
