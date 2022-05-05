import React, { useState, useEffect } from 'react'
import Dice from './Dice';
import Token from './Token';
import details from '../details.json';

import greenTokenImage from '../assets/images/greenToken.png'
import yellowTokenImage from '../assets/images/yellowToken.png'
import blueTokenImage from '../assets/images/blueToken.png'
import redTokenImage from '../assets/images/redToken.png'


function Board(props) {
    let boardWidth, boardHeight, diceBoardWidth, diceBoardHeight, flexDirection = "row";

    if (window.innerWidth < window.innerHeight) {
        boardWidth = window.innerHeight / 2.3;
        boardHeight = boardWidth;
        diceBoardWidth = boardWidth;
        diceBoardHeight = boardHeight / 2;
        flexDirection = "column";
    }
    else {
        boardWidth = window.innerWidth / 2.3;
        boardHeight = boardWidth;
        diceBoardWidth = boardWidth / 1.5;
        diceBoardHeight = boardHeight;
    }
    let tokenSize = boardWidth / 15;

    // let tokenDistance = []

    const [positions, setPositions] = useState([
        { color: 'green', id: 'g1', p: 'g1' },
        { color: 'green', id: 'g2', p: 'g2' },
        { color: 'green', id: 'g3', p: 'g3' },
        { color: 'green', id: 'g4', p: 'g4' },
        { color: 'yellow', id: 'y1', p: 'y1' },
        { color: 'yellow', id: 'y2', p: 'y2' },
        { color: 'yellow', id: 'y3', p: 'y3' },
        { color: 'yellow', id: 'y4', p: 'y4' },
        { color: 'blue', id: 'b1', p: 'b1' },
        { color: 'blue', id: 'b2', p: 'b2' },
        { color: 'blue', id: 'b3', p: 'b3' },
        { color: 'blue', id: 'b4', p: 'b4' },
        { color: 'red', id: 'r1', p: 'r1' },
        { color: 'red', id: 'r2', p: 'r2' },
        { color: 'red', id: 'r3', p: 'r3' },
        { color: 'red', id: 'r4', p: 'r4' }
    ])

    const [number, setNumber] = useState(0);
    const [turn, setTurn] = useState('green');
    const [changeTurn, setChangeTurn] = useState(false);
    const [collideTokenID, setCollideTokenID] = useState("");
    const [botRollDice, setBotRollDice] = useState(false);

    useEffect(() => {
        if (changeTurn) {
            if (turn === 'green') {
                props.status.yellow.playing ? setTurn('yellow') : props.status.blue.playing ? setTurn('blue') : props.status.red.playing ? setTurn('red') : setTurn('green');
            }
            else if (turn === 'yellow') {
                props.status.blue.playing ? setTurn('blue') : props.status.red.playing ? setTurn('red') : props.status.green.playing ? setTurn('green') : setTurn('yellow');
            }
            else if (turn === 'blue') {
                props.status.red.playing ? setTurn('red') : props.status.green.playing ? setTurn('green') : props.status.yellow.playing ? setTurn('yellow') : setTurn('blue');
            }
            else if (turn === 'red') {
                props.status.green.playing ? setTurn('green') : props.status.yellow.playing ? setTurn('yellow') : props.status.blue.playing ? setTurn('blue') : setTurn('red');
            }
            setChangeTurn(false);
            setTimeout(() => {
                setNumber(0);
            }, 1000);
        }
    }, [setTurn, changeTurn, props, turn])

    //? check if now bot can roll dice or not
    useEffect(() => {
        turn === 'green' && props.status.green.bot ? setBotRollDice(true) :
            turn === 'yellow' && props.status.yellow.bot ? setBotRollDice(true) :
                turn === 'blue' && props.status.blue.bot ? setBotRollDice(true) :
                    turn === 'red' && props.status.red.bot ? setBotRollDice(true) : setBotRollDice(false);
    }, [setBotRollDice, props, turn])

    return (
        <>
            <div className='container' style={{ flexDirection: `${flexDirection}` }}>
                <div className='board' style={{ width: `${boardWidth}px`, height: `${boardHeight}px` }}>
                    {details.map((element) => {
                        if (element.colour === 'green' && props.status.green.playing) {
                            return <div key={element.id} >
                                <Token
                                    color={element.colour}
                                    id={element.id}
                                    number={number}
                                    setNumber={setNumber}
                                    turn={turn}
                                    setChangeTurn={setChangeTurn}
                                    tokenSize={tokenSize}
                                    x={element.x}
                                    y={element.y}
                                    positions={positions}
                                    setPositions={setPositions}
                                    image={greenTokenImage}
                                    path={element.path}
                                    collideTokenID={collideTokenID}
                                    setCollideTokenID={setCollideTokenID}
                                    botPlaying={props.status.green.bot}
                                />
                            </div>
                        }
                        if (element.colour === 'yellow' && props.status.yellow.playing) {
                            return <div key={element.id} >
                                <Token
                                    color={element.colour}
                                    id={element.id}
                                    number={number}
                                    setNumber={setNumber}
                                    turn={turn}
                                    setChangeTurn={setChangeTurn}
                                    tokenSize={tokenSize}
                                    x={element.x}
                                    y={element.y}
                                    positions={positions}
                                    setPositions={setPositions}
                                    image={yellowTokenImage}
                                    path={element.path}
                                    collideTokenID={collideTokenID}
                                    setCollideTokenID={setCollideTokenID}
                                    botPlaying={props.status.yellow.bot}
                                />
                            </div>
                        }
                        if (element.colour === 'blue' && props.status.blue.playing) {
                            return <div key={element.id} >
                                <Token
                                    color={element.colour}
                                    id={element.id}
                                    number={number}
                                    setNumber={setNumber}
                                    turn={turn}
                                    setChangeTurn={setChangeTurn}
                                    tokenSize={tokenSize}
                                    x={element.x}
                                    y={element.y}
                                    positions={positions}
                                    setPositions={setPositions}
                                    image={blueTokenImage}
                                    path={element.path}
                                    collideTokenID={collideTokenID}
                                    setCollideTokenID={setCollideTokenID}
                                    botPlaying={props.status.blue.bot}
                                />
                            </div>
                        }
                        if (element.colour === 'red' && props.status.red.playing) {
                            return <div key={element.id} >
                                <Token
                                    color={element.colour}
                                    id={element.id}
                                    number={number}
                                    setNumber={setNumber}
                                    turn={turn}
                                    setChangeTurn={setChangeTurn}
                                    tokenSize={tokenSize}
                                    x={element.x}
                                    y={element.y}
                                    positions={positions}
                                    setPositions={setPositions}
                                    image={redTokenImage}
                                    path={element.path}
                                    collideTokenID={collideTokenID}
                                    setCollideTokenID={setCollideTokenID}
                                    botPlaying={props.status.true.bot}
                                />
                            </div>
                        }
                        return null;
                    })}
                </div>
                <div className='diceBoard' style={{ width: `${diceBoardWidth}px`, height: `${diceBoardHeight}px`, flexDirection: flexDirection === "column" ? "row" : "column" }}>
                    <Dice
                        setNumber={setNumber}
                        number={number}
                        botRollDice={botRollDice}
                        setBotRollDice={setBotRollDice}
                    />
                    <div className="playerName" style={{ color: "white", fontSize: "1.5rem" }}>
                        {turn}'s turn
                    </div>
                </div>
            </div>
        </>
    )
}

export default Board
