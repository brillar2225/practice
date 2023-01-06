import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={style.nav}>
      <div className={style.nav__home}>
        <Link to='/' className={style.nav__link}>
          Movie Rank
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
