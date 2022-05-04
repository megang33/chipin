import React from 'react';
import App from './App.js';
import SignUp from './pages/signup.js';
import NavBar from './components/navbar.js';
import { Route, Routes } from 'react-router-dom';

export const Routing = () => {
  return (
    <div>
        <NavBar />
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
        
    </div>
  );
};