import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Landing from '../pages/landing.js';
import SignUp from '../pages/signup.js';
import Community from '../pages/community.js';
import EventCreation from '../pages/event-creation.js';
import SignOut from '../pages/signout.js';
import Event from '../pages/events.js'
import NavBar from './navbar.js';
import Profile from '../pages/profile.js'
import TimeLine from '../pages/timeline.js';

export const Routing = (props) => {
  return (
    <div>
      <NavBar signedIn={props.loggedIn} handleSignIn={props.handleSignIn} handleSignOut={props.handleSignOut} role={props.role} />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/signup' element={props.registered ? <Navigate to='/' /> : <SignUp uid={props.uid} updateInfo={props.updateInfo} />} />
        <Route path='/timeline' element={<TimeLine name={props.name} uid={props.uid} numGroups={props.numGroups} />} />
        <Route path='/community' element={<Community uid={props.uid} updateInfo={props.updateInfo} />} />
        <Route path='/events' element={<Event uid={props.uid}/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/event-creation' element={<EventCreation />} />
      </Routes>
    </div>
  );
};