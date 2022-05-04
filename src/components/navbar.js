import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
const NavBar = (props) => {
  if (props.signedIn){
    return (
    <div className='navbar-in'>
      <div>
              <img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo"/>
              <Link to="/">| Chip In</Link>
            </div>
      <div>
          <Link to="/community">Community</Link>
          <Link to="/events">Find an Event</Link>
          <Link to="">Log out</Link>
      </div>
    </div>
    );
    }else{
      return (
        <div className='navbar-out'>
            <div>
              <img className='logo'  src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" />
              <Link to="/">| Chip In</Link>
            </div>
            <div>
              <Link to="/community">Community</Link>
              <Link to="/signup">Sign In</Link>
            </div>
        </div>
        );
      }
}
export default NavBar;