import './App.css';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Board from './components/Board';
import EndingPage from './components/EndingPage';

function App() {

  const [rank, setRank] = useState({
    first: '', second: '', third: ''
  })

  const [status, setStatus] = useState({
    green: {
      name: 'GreenBot',
      playing: true,
      bot: false
    },
    yellow: {
      name: 'YellowBot',
      playing: true,
      bot: true
    },
    blue: {
      name: 'BlueBot',
      playing: false,
      bot: false
    },
    red: {
      name: 'RedBot',
      playing: false,
      bot: false
    }
  });

  return (
    <>
      <LandingPage setStatus={setStatus} />
      <Board status={status} rank={rank} setRank={setRank} />
      <EndingPage rank={rank} />
    </>
  );
}

export default App;
