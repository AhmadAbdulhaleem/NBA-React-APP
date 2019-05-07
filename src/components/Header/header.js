import React from 'react';
import { Link } from 'react-router-dom';
// import FontAwesome from 'react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import SideNav from './SideNav/sideNav';

const Header = props => {
  const logo = () => (
    <Link to="/" className="logo">
      <img src="/images/nba_logo.png" alt="nba logo" />
    </Link>
  );

  const navBars = () => (
    <div className="bars">
      <FontAwesomeIcon
        onClick={props.onOpenNav}
        icon={faBars}
        style={{ color: '#dfdfdf', padding: '10px', cursor: 'pointer' }}
      />
    </div>
  );

  return (
    <div className="header">
      <SideNav {...props} />
      <div className="headerOpt">
        {navBars()}
        {logo()}
      </div>
    </div>
  );
};

export default Header;
