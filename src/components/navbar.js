import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
const NavBar = (props) => {
  if (props.signedIn) {
    return (
      <div className='navbar-in'>
        <div>
          <img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" />
          <Link to="/">| Chip In</Link>
        </div>
        <div className='links'>
          <Link to="/community">Community</Link>
          <Link to="/events">Find an Event</Link>
          <Link to="/event-creation">Make an Event</Link>
          <Link to="/profile">You</Link>
          <Link to="/signout" onClick={props.handleSignOut}>Log out</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className='navbar-out'>
        <div>
          <img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" />
          <Link to="/">| Chip In</Link>
        </div>
        <div>
          <Link to="/community">Community</Link>
          <Link to="/signup" onClick={props.handleSignIn}>Sign In</Link>
          {/* <button onClick={signInWithGoogle}> Sign in with Google </button> */}
        </div>
      </div>
    );
  }
}
export default NavBar;