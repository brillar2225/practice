import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import style from './Root.module.css';

function Root() {
  return (
    <div className={style.root}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
