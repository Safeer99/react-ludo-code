import './App.css'
import React, { useEffect, useState } from 'react'
import LandingPage from './components/LandingPage'
import Board from './components/Board'
import EndingPage from './components/EndingPage'

function App() {

  const [active, setActive] = useState("start");
  const [start, setStart] = useState(false)
  const [totalPlaying, setTotalPlaying] = useState(0)
  const [finished, setFinished] = useState({
    green: false, yellow: false, blue: false, red: false
  })

  const [rank, setRank] = useState([])

  const [status, setStatus] = useState({
    green: { name: 'GreenBot', playing: true, bot: false },
    yellow: { name: 'YellowBot', playing: true, bot: false },
    blue: { name: 'BlueBot', playing: true, bot: false },
    red: { name: 'RedBot', playing: true, bot: false }
  })

  useEffect(() => {
    if (rank.length === totalPlaying - 1 && start) {
      if (status.green.playing && !finished.green) { setRank(p => [...p, { color: 'green', p: 1 + rank.length }]) }
      else if (status.yellow.playing && !finished.yellow) { setRank(p => [...p, { color: 'yellow', p: 1 + rank.length }]) }
      else if (status.blue.playing && !finished.blue) { setRank(p => [...p, { color: 'blue', p: 1 + rank.length }]) }
      else if (status.red.playing && !finished.red) { setRank(p => [...p, { color: 'red', p: 1 + rank.length }]) }

      setStart(false)
      setActive("end")
    }
  }, [finished, rank, start, status, totalPlaying])

  return (
    <>
      <Board status={status} rank={rank} setRank={setRank} finished={finished} setFinished={setFinished} start={start} />
      {active === "start" && <LandingPage setStatus={setStatus} setStart={setStart} setTotalPlaying={setTotalPlaying} setActive={setActive} />}
      {active === "end" && <EndingPage rank={rank} status={status} totalPlaying={totalPlaying} />}
    </>
  );
}

export default App;
