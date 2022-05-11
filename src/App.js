import './App.css';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Board from './components/Board';

function App() {

  const [status, setStatus] = useState({
    green: {
      name: '',
      playing: true,
      bot: false
    },
    yellow: {
      name: '',
      playing: false,
      bot: false
    },
    blue: {
      name: '',
      playing: true,
      bot: true
    },
    red: {
      name: '',
      playing: false,
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
