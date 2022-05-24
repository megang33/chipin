import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import './navbar.css';
const NavBar = (props) => {
  if (props.signedIn) {
    return (
    <div className='bar-rectangle' id='navbar-in'>
      <div>
        <Link to="/"><img className='logo'  src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" /></Link>
      </div>
      <div className='links'>
        <Link to="/community" className='nav-item'>community</Link>
        <Link to="/timeline" className='nav-item'>timeline</Link>
        <Link to="/events" className='nav-item'>find an event</Link>
        <Link to="/event-creation" className='nav-item'>make an event</Link>
        <Link to="/profile" className='nav-item'>you</Link>
        <Link to="/signout" className='nav-item' id='sign-button' onClick={props.handleSignOut}>log out</Link>
      </div>
    </div>
    );
    }else{
      return (
        <div className='bar-rectangle' id='navbar-out'>
          <div>
            <Link to="/"><img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" /></Link>
          </div>
          <div className='links'>
            {/* <Link to="/community" className='nav-item'>community</Link> */}
            <Link to="/signup" id='sign-button' className='nav-item' onClick={props.handleSignIn}>sign in</Link>
            {/* <button onClick={signInWithGoogle}> Sign in with Google </button> */}
          </div>
        {/* <div className='links'>
          <Link to="/community" className='nav-item'>community</Link>
          <Link to="/timeline" className='nav-item'>timeline</Link>
          <Link to="/events" className='nav-item'>find an event</Link>
          <Link to="/event-creation" className='nav-item'>make an event</Link>
          <Link to="/profile" className='nav-item'>you</Link>
          <Link to="/signout" className='nav-item' id='sign-button' onClick={props.handleSignOut}>log out</Link>
        </div> */}
      </div>
    );
  }
}
export default NavBar;