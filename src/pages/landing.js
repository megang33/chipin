import React from 'react'
import SignUp from '../pages/signup.js';
import './landing.css';

const Landing = () => {
    const redirect = () => { window.location = "/signup" }
    return(
        <div className='landing-div'>
            <h1 style={{ paddingTop: "100px" }}>Welcome to ChipIn!</h1>
            <button className='signup-button' onClick={ redirect }>Sign Up</button>
        </div>
        
    );
}
export default Landing;