import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

function Root() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default Root;
