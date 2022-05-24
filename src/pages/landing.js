import React from 'react'
import SignUp from '../pages/signup.js';

const Landing = () => {
    const redirect = () => { window.location = "/signup" }
    return(
        <div>
            <h3>Welcome to ChipIn!</h3>
            <button onClick={ redirect }>Sign Up</button>
        </div>
        
    );
}
export default Landing;