import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import './navbar.css';
const NavBar = (props) => {
  console.log(props.role)

  if (props.signedIn && props.role && props.registered) {
    return (
      <div className='bar-rectangle' id='navbar-in'>
        <div>
          <Link to="/"><img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" /></Link>
        </div>
        <div className='links'>
          <Link to="/community" className='nav-item'>community</Link>
          <Link to="/timeline" className='nav-item'>timeline</Link>
          <Link to="/events" className='nav-item'>find an event</Link>
          {/* <Link to="/profile" className='nav-item'>you</Link> */}
          <Link to="/" className='nav-item' id='sign-button' onClick={props.handleSignOut}>log out</Link>
        </div>
      </div>
    );
  }
  else if (props.signedIn && !props.role && props.registered) {
    return (
      <div className='bar-rectangle' id='navbar-in'>
        <div>
          <Link to="/"><img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" /></Link>
        </div>
        <div className='links'>
          <Link to="/community" className='nav-item'>community</Link>
          <Link to="/timeline" className='nav-item'>timeline</Link>
          <Link to="/event-creation" className='nav-item'>make an event</Link>
          <Link to="/my-events" className='nav-item'>my events</Link>
          {/* <Link to="/profile" className='nav-item'>you</Link> */}
          <Link to="/" className='nav-item' id='sign-button' onClick={props.handleSignOut}>log out</Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='bar-rectangle' id='navbar-out'>
        <div>
          <Link to="/"><img className='logo' src="https://tinyurl.com/mvc9bsk4" alt="ChipIn Logo" /></Link>
        </div>
        <div className='links'>
          {/* <Link to="/community" className='nav-item'>community</Link> */}
          <Link to="/" id='sign-button' className='nav-item' onClick={props.handleSignIn}>sign in</Link>
          {/* <button onClick={signInWithGoogle}> Sign in with Google </button> */}
        </div>
      </div>
    );
  }
}
export default NavBar;