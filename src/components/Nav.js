import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Nav = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <nav>
        <div>Logo</div>
        <ul>
          {currentUser
          ? (
            <div className='welcome-back'>
              <span>Welcome back {currentUser.name}</span>
              <Link to="/logout" className='link'>Logout</Link>
            </div>
            )
          : <Link to="/sign-in" className='link'>Sign in</Link>
          }  
        </ul>
    </nav>
  )
}

export default Nav;