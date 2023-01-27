import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleLeft } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  const navigation = useNavigate();

  return (
    <nav className={style.navbar}>
      <NavLink to='/' className={style.navbar__home}>
        <FontAwesomeIcon icon={faHome} />
        <span className={style.navbar__span}>Home</span>
      </NavLink>
      <button onClick={() => navigation(-1)} className={style.navbar__prevBtn}>
        <FontAwesomeIcon icon={faCircleLeft} />
        <span className={style.navbar__span}>Go Back</span>
      </button>
    </nav>
  );
}

export default Navigation;
