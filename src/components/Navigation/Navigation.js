import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className='navigation'>
          <NavLink className='navigation-link' to='/signin'>Sign Out</NavLink>
        </nav>
      )
    } else {
      return (
        <nav className='navigation'>
          <div className='navigation-container'>
            <NavLink className='navigation-link navigation-link-1' to='/signin'>Signin</NavLink>
            <NavLink className='navigation-link navigation-link-2' to='/register'>Register</NavLink>
          </div>
        </nav>
      )
    }
}

export default Navigation;
