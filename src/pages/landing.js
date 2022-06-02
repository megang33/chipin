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
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h1 style={{ fontSize: "40px", paddingTop: "100px", paddingBottom: "65px", paddingRight: "15px" }}>Welcome to </h1>
                    <img style={{ height: "125px" }} src={require('../components/logo.png')} alt="ChipIn Logo" />
                </div>
                <text style={{ fontSize: "25px", marginTop: "-30px" }}>Building a community, for the community.</text>
            </div>
        );
    }
    else {
        return(
            <div className='landing-div'>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h1 style={{ paddingTop: "100px", paddingBottom: "70px", paddingRight: "15px" }}>Welcome to </h1>
                    <img style={{ height: "100px" }} src={require('../components/logo.png')} alt="ChipIn Logo" />
                </div>
                
                <text style={{ marginTop: "-70px", paddingBottom: "50px" }}>Building a community, for the community.</text>
                <div className='landing-buttons'>
                    <Link to="/signup" style={{ textDecoration: "none" }} className='forward-button' onClick={props.handleSignIn}>Sign Up</Link>
                    <Link to="/" style={{ textDecoration: "none" }} className='forward-button' onClick={props.handleSignIn}>Sign In</Link>
                </div>
            </div>
        );
    }
}
export default Landing;