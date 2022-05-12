import './App.css';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Board from './components/Board';

function App() {

  const [status, setStatus] = useState({
    green: {
      name: 'GreenBot',
      playing: true,
      bot: false
    },
    yellow: {
      name: 'YellowBot',
      playing: true,
      bot: false
    },
    blue: {
      name: 'BlueBot',
      playing: true,
      bot: false
    },
    red: {
      name: 'RedBot',
      playing: true,
      bot: false
    }
  });

  return (
    <>
      <LandingPage setStatus={setStatus} />
      <Board status={status} />
    </>
  );
}

export default App;
