import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigation = useNavigate();

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <button onClick={() => navigation(-1)}>Previous</button>
    </nav>
  );
}

export default Navigation;
