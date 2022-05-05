import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <div className='navbar'>
        <button className='logo' href="landing.js">
          ChipIn Logo
        </button>
        <div className='other_pages'>
          <text>
            <a href='./community.js' className='link'>
              Community
            </a>
          </text>
          <text>
            <a href='./map.html' className='link'>
              Find an event
            </a>
          </text>
          <text>
            <a href='./events.js' className='link'>
              Profile (needs icon)
            </a>
          </text>
          <text>
            <a href='./map.js' className='link'>
              Maps
            </a>
          </text>

        </div>
      </div>
      <h1>
        This is going to be filler text for the meanwhile to test.
      </h1>
    </div>
  );
}

export default App;
