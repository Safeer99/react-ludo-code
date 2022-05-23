import React, { useState, useEffect, useCallback, useRef } from 'react'
import rollingSound from '../assets/audio/dice-roll-sound-effect.mp3'
import vibrate from '../assets/audio/vibrate.wav'

function Dice(props) {

    const [animation, setAnimation] = useState('')
    const [off, setOff] = useState('all')
    const [vibrateAnimation, setVibrateAnimation] = useState('')
    const limiter = useRef(0)

    const rollDice = useCallback(() => {
        if (props.number === 0 && props.block) {
            props.setNumber(0)
            setVibrateAnimation('')
            props.setBlock(false)
            let audio = new Audio(rollingSound)
            audio.play()
            let number = Math.floor(1 + (6) * Math.random())
            for (let i = 1; i <= 6; i++) {
                if (number === i) {
                    setAnimation('0')
                    setTimeout(() => {
                        setAnimation(`show-${i}`)
                    }, 100)
                }
            }
            if (number === 6) { limiter.current += 1 }
            else if (number < 6) { limiter.current = 0 }
            setTimeout(() => {
                if (limiter.current !== 3) {
                    props.setNumber(number)
                } else {
                    limiter.current = 0
                    let sound = new Audio(vibrate)
                    sound.play()
                    setVibrateAnimation("diceVibrateAnimation")
                    setTimeout(() => {
                        props.setNumber(0)
                        props.setChangeTurn(true)
                        props.setBlock(true)
                    }, 800);
                }
            }, 500)
        }
    }, [props])

    useEffect(() => {
        if (props.botRollDice) {
            setOff('none')
            props.setBotRollDice(false)
            setTimeout(() => {
                rollDice()
            }, 500)
        }
    }, [props, rollDice])

    useEffect(() => {
        if (props.turn === 'green' && !props.status.green.bot) { setOff('all') }
        else if (props.turn === 'yellow' && !props.status.yellow.bot) { setOff('all') }
        else if (props.turn === 'blue' && !props.status.blue.bot) { setOff('all') }
        else if (props.turn === 'red' && !props.status.red.bot) { setOff('all') }
    }, [props])

    return (
        <div>
            <div className={`dice ${vibrateAnimation}`} id="roll" onClick={rollDice} style={{ pointerEvents: `${off}` }}>
                <div id="sides-box" className={`${animation}`}>
                    <div className="side">
                        <div className="one-1 dot"></div>
                    </div>
                    <div className="side">
                        <div className="two-1 dot"></div>
                        <div className="two-2 dot"></div>
                    </div>
                    <div className="side">
                        <div className="three-1 dot"></div>
                        <div className="three-2 dot"></div>
                        <div className="three-3 dot"></div>
                    </div>
                    <div className="side">
                        <div className="four-1 dot"></div>
                        <div className="four-2 dot"></div>
                        <div className="four-3 dot"></div>
                        <div className="four-4 dot"></div>
                    </div>
                    <div className="side">
                        <div className="five-1 dot"></div>
                        <div className="five-2 dot"></div>
                        <div className="five-3 dot"></div>
                        <div className="five-4 dot"></div>
                        <div className="five-5 dot"></div>
                    </div>
                    <div className="side">
                        <div className="six-1 dot"></div>
                        <div className="six-2 dot"></div>
                        <div className="six-3 dot"></div>
                        <div className="six-4 dot"></div>
                        <div className="six-5 dot"></div>
                        <div className="six-6 dot"></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dice
