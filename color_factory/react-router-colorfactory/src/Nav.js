import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/colors">Home</Link>
      <Link to="/colors/new">Add a Color</Link>
    </nav>
  );
}

export default Nav;
