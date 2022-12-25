import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Nav = () => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav>
        <div className='logo' onClick={() => navigate("/")}>
          <h1>Smart Brain</h1>
          <p>Face Recognition</p>
        </div>
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