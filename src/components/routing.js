import React from 'react';
import App from '../App.js';
import SignUp from '../pages/signup.js';
import Community from '../pages/community.js';
import Event from '../pages/events.js'
import NavBar from './navbar.js';
import { Route, Routes} from 'react-router-dom';

export const Routing = () => {
  return (
    <div>
        <NavBar signedIn={false}/>
        <Routes>
            <Route exact path='/' element={<App />} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/community' element={<Community />} />
            <Route path='/events' element={<Event />} />
        </Routes>
    </div>
  );
};