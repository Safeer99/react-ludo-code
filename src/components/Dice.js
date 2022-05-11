import React, { useState, useEffect, useCallback } from 'react'
// import rollingSound from '../assets/audio/dice-roll-sound-effect.mp3';

function Dice(props) {

    const [animation, setAnimation] = useState('');

    const rollDice = useCallback(() => {
        if (props.number === 0 && props.block) {
            // let audio = new Audio(rollingSound);
            // audio.play();
            let number = Math.floor(1 + (6) * Math.random());
            for (let i = 1; i <= 6; i++) {
                if (number === i) {
                    setAnimation('0')
                    setTimeout(() => {
                        setAnimation(`show-${i}`);
                    }, 100);
                }
            }
            props.setBlock(false);
            setTimeout(() => {
                props.setNumber(number);
            }, 500);
        }
    }, [props])

    useEffect(() => {
        if (props.botRollDice) {
            props.setBotRollDice(false);
            setTimeout(() => {
                rollDice();
            }, 500);
        }
    }, [props.botRollDice, rollDice])

    return (
        <div>
            <div className="dice" id="roll" onClick={rollDice}>
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
