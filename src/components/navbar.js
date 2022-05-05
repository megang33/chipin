import React from 'react';
import './navbar.css';
import '../index.css';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../utils/firebase.js';
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
            <div className='logo-space'>
              <Link to="/" style={{ color: 'black', textDecoration: 'none' }}><img className='logo' src="./logo.png" alt="Logo"/></Link>
            </div>
            <div className='tabs'>
              <Link to="/community" className='link'>Community</Link>
              <Link to="/signup" className='link'>Sign In</Link>
              <button onClick={signInWithGoogle}> Sign in with Google </button>
            </div>
        </div>
        );
      }
}
export default NavBar;