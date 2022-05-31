import { getThemeProps } from '@mui/system';
import React from 'react'
import SignUp from '../pages/signup.js';
import './landing.css';
import '../index.css'
import { Link } from 'react-router-dom';

const Landing = (props) => {
    const redirect = () => { window.location = "/signup" }

    if (props.signedIn && props.registered) {
        return(
            <div className='landing-div'>
                <h1 style={{ paddingTop: "100px" }}>Welcome to ChipIn!</h1>
            </div>
        );
    }
    else {
        return(
            <div className='landing-div'>
                <h1 style={{ paddingTop: "100px" }}>Welcome to ChipIn!</h1>
                <div className='landing-buttons'>
                    <Link to="/signup" style={{ textDecoration: "none" }} className='forward-button' onClick={props.handleSignIn}>sign up</Link>
                    <Link to="/" style={{ textDecoration: "none" }} className='forward-button' onClick={props.handleSignIn}>sign in</Link>
                </div>
                
            </div>
        );
    }
}
export default Landing;