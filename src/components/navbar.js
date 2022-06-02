import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = (props) => {
  console.log(props.role)

  if (props.signedIn && props.role && props.registered) {
    return (
      <div className='bar-rectangle' id='navbar-in'>
        <div style={{ positiom: "relative" }}>
          <Link to="/" className='logo-link'><img className='logo' src={require('./logo.png')} alt="ChipIn Logo" /></Link>
        </div>
        <div className='links'>
          <Link to="/community" className='nav-item'>Community</Link>
          <Link to="/timeline" className='nav-item'>Timeline</Link>
          <Link to="/events" className='nav-item'>Find an Event</Link>
          {/* <Link to="/profile" className='nav-item'>you</Link> */}
          <Link to="/" className='nav-item' id='sign-button' onClick={props.handleSignOut}>Log Out</Link>
        </div>
      </div>
    );
  }
  else if (props.signedIn && !props.role && props.registered) {
    return (
      <div className='bar-rectangle' id='navbar-in'>
        <div>
          <Link to="/" className='logo-link'><img className='logo' src={require('./logo.png')} alt="ChipIn Logo" /></Link>
        </div>
        <div className='links'>
          <Link to="/community" className='nav-item'>Community</Link>
          <Link to="/timeline" className='nav-item'>Timeline</Link>
          <Link to="/event-creation" className='nav-item'>Make an Event</Link>
          <Link to="/my-events" className='nav-item'>My Events</Link>
          {/* <Link to="/profile" className='nav-item'>you</Link> */}
          <Link to="/" className='nav-item' id='sign-button' onClick={props.handleSignOut}>Log Out</Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='bar-rectangle' id='navbar-out'>
        <div>
          <Link to="/" className='logo-link'><img className='logo' src={require('./logo.png')} alt="ChipIn Logo" /></Link>
        </div>
        <div className='links'>
          {/* <Link to="/community" className='nav-item'>community</Link> */}
          <Link to="/" id='sign-button' className='nav-item' onClick={props.handleSignIn}>Sign In</Link>
          {/* <button onClick={signInWithGoogle}> Sign in with Google </button> */}
        </div>
      </div>
    );
  }
}
export default NavBar;