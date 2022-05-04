import React from 'react';
import { Link } from "react-router-dom";
import { signInWithGoogle } from '../utils/firebase.js';

const NavBar = () => {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <button onClick={signInWithGoogle}> Sign in with Google </button>
      </li>
    </div>
  );
}
export default NavBar;