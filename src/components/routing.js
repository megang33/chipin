import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Landing from '../pages/landing.js';
import SignUp from '../pages/signup.js';
import Community from '../pages/community.js';
import SignOut from '../pages/signout.js';
import Event from '../pages/events.js'
import NavBar from './navbar.js';
import Profile from '../pages/profile.js'
import TimeLine from '../pages/timeline.js';

export const Routing = (props) => {
  return (
    <div>
      <NavBar signedIn={props.loggedIn} handleSignIn={props.handleSignIn} handleSignOut={props.handleSignOut} />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/signup' element={props.registered ? <Navigate to='/' /> : <SignUp uid={props.uid} updateInfo={props.updateInfo} />} />
        <Route path='/community' element={<Community />} />
        <Route path='/timeline' element={<TimeLine name = { props.name } />} />
        <Route path='/events' element={<Event />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signout' element={<SignOut />} />
      </Routes>
    </div>
  );
};