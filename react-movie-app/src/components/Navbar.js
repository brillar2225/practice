import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={style.nav}>
      <div className={style.nav__home}>
        <h1>Movie Rank</h1>
      </div>
      <Link to='/' className={style.nav__link}>
        Home
      </Link>
    </nav>
  );
}

export default Navbar;
