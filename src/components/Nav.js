import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
        <div>Logo</div>
        <ul>
            <Link to="/">Sign in</Link>
        </ul>
    </nav>
  )
}

export default Nav;