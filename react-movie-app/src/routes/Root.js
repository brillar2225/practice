import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import style from './Root.module.css';

function Root() {
  return (
    <div className={style.root}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
