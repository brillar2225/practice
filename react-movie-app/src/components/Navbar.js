import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div>
        <h1>Movie Rank</h1>
      </div>
      <Link to='/'>Home</Link>
    </nav>
  );
}

export default Navbar;
