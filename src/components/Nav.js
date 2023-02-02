import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {TbMenu} from "react-icons/tb";
import {RxCross2} from "react-icons/rx";

const Nav = () => {
  const {currentUser} = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav>
        <div className='logo' onClick={() => navigate("/smart-brain-app")}>
          <h1>Smart Brain</h1>
          <p>Face Recognition</p>
        </div>
        <ul>
          {currentUser
          ? (
            <>
            <div className='ul-right'>
              <span>Welcome back {currentUser.name}</span>
              <Link to="/profile" className='link'>Profile</Link>
              <Link to="/logout" className='link'>Logout</Link>
            </div>
            {isMobileMenuOpen ? <span className='icon-container' onClick={handleToggleMenu}><RxCross2 className='icon'/></span> : null}
            {!isMobileMenuOpen ? <span className='icon-container' onClick={handleToggleMenu}><TbMenu className='icon'/></span> : null}
            <div className={isMobileMenuOpen ? 'menu open' : 'menu close'}>
              <span>Welcome back {currentUser.name}</span>
              <Link to="/profile" className='link' onClick={handleToggleMenu}>Profile</Link>
              <Link to="/logout" className='link' onClick={handleToggleMenu}>Logout</Link>
            </div>
            </>
            )
          : (
            <>
            <div className='ul-right'>
              <Link to="/sign-in" className='link'>Sign in</Link>
              <Link to="/register" className='link'>Register</Link>
            </div>
            {isMobileMenuOpen ? <span className='icon-container' onClick={handleToggleMenu}><RxCross2 className='icon'/></span> : null}
            {!isMobileMenuOpen ? <span className='icon-container' onClick={handleToggleMenu}><TbMenu className='icon'/></span> : null}
            <div className={isMobileMenuOpen ? 'menu open' : 'menu close'}>
              <Link to="/sign-in" className='link' onClick={handleToggleMenu}>Sign in</Link>
              <Link to="/register" className='link' onClick={handleToggleMenu}>Register</Link>
            </div>
            </>
            )
          }
        </ul>
    </nav>
  )
}

export default Nav;