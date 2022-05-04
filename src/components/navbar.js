import React from 'react';
import { Link } from "react-router-dom";
const NavBar= () => {
  return (
  <div>
    <li>
        <Link to="/">Home</Link>
    </li>
    <li>
        <Link to="/signup">Sign Up</Link>
    </li>
  </div>
  );
}
export default NavBar;