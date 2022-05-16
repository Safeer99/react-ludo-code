import React, { useState, useEffect } from 'react'
import Dice from './Dice';
import Token from './Token';
import details from '../details.json';

import greenTokenImage from '../assets/images/greenToken.png'
import yellowTokenImage from '../assets/images/yellowToken.png'
import blueTokenImage from '../assets/images/blueToken.png'
import redTokenImage from '../assets/images/redToken.png'
import Winner from './Winner';

function winnerChecker(positions, rank, setRank) {
    let gCount = 0, yCount = 0, bCount = 0, rCount = 0;
    positions.forEach(element => {
        if (element.color === 'green' && element.p === '06') {
            gCount++;
        } else if (element.color === 'yellow' && element.p === '09') {
            yCount++;
        } else if (element.color === 'blue' && element.p === '08') {
            bCount++;
        } else if (element.color === 'red' && element.p === '07') {
            rCount++;
        }
    })
    if (gCount === 4 && rank.first !== 'green' && rank.second !== 'green' && rank.third !== 'green') {
        rank.first === '' ? setRank({ ...rank, first: "green" }) : rank.second === '' ? setRank({ ...rank, second: "green" }) : setRank({ ...rank, third: "green" });
    }
    if (yCount === 4 && rank.first !== 'yellow' && rank.second !== 'yellow' && rank.third !== 'yellow') {
        rank.first === '' ? setRank({ ...rank, first: "yellow" }) : rank.second === '' ? setRank({ ...rank, second: "yellow" }) : setRank({ ...rank, third: "yellow" });
    }
    if (bCount === 4 && rank.first !== 'blue' && rank.second !== 'blue' && rank.third !== 'blue') {
        rank.first === '' ? setRank({ ...rank, first: "blue" }) : rank.second === '' ? setRank({ ...rank, second: "blue" }) : setRank({ ...rank, third: "blue" });
    }
    if (rCount === 4 && rank.first !== 'red' && rank.second !== 'red' && rank.third !== 'red') {
        rank.first === '' ? setRank({ ...rank, first: "red" }) : rank.second === '' ? setRank({ ...rank, second: "red" }) : setRank({ ...rank, third: "red" });
    }
}

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
        boardWidth = window.innerWidth / 2.5;
        boardHeight = boardWidth;
        diceBoardWidth = boardWidth / 1.5;
        diceBoardHeight = boardHeight;
    }
    let tokenSize = boardWidth / 15;

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

    const [botMoves, setBotMoves] = useState([]);
    const [number, setNumber] = useState(0);
    const [turn, setTurn] = useState('red');
    const [changeTurn, setChangeTurn] = useState(true);
    const [collideTokenID, setCollideTokenID] = useState("");
    const [botRollDice, setBotRollDice] = useState(false);
    const [block, setBlock] = useState(true);
    const [name, setName] = useState('');

    useEffect(() => {
        //? check if now bot can roll dice or not
        if (!changeTurn && block) {
            turn === 'green' && props.status.green.bot ? setBotRollDice(true) :
                turn === 'yellow' && props.status.yellow.bot ? setBotRollDice(true) :
                    turn === 'blue' && props.status.blue.bot ? setBotRollDice(true) :
                        turn === 'red' && props.status.red.bot ? setBotRollDice(true) : setBotRollDice(false);
        }
    }, [setBotRollDice, props, turn, changeTurn, block])

    useEffect(() => {
        if (changeTurn) {
            winnerChecker(positions, props.rank, props.setRank);
            setTimeout(() => {
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
            }, 500);
        }
    }, [changeTurn, props, turn, positions])

    useEffect(() => {
        //? changing the name of player on screen
        turn === 'green' ? setName(props.status.green.name) :
            turn === 'yellow' ? setName(props.status.yellow.name) :
                turn === 'blue' ? setName(props.status.blue.name) :
                    turn === 'red' ? setName(props.status.red.name) : setName('');

    }, [name, turn, props])

    return (
        <>
            <div className='container' style={{ flexDirection: `${flexDirection}` }}>
                <div className='board' style={{ width: `${boardWidth}px`, height: `${boardHeight}px` }}>
                    <div style={{ width: `${boardWidth}px`, height: `${boardHeight}px`, position: "absolute", pointerEvents: 'none' }}>
                        <Winner rank={'first'} color={props.rank.first} />
                        <Winner rank={'second'} color={props.rank.second} />
                        <Winner rank={'third'} color={props.rank.third} />
                    </div>
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
                                    setBlock={setBlock}
                                    setBotMoves={setBotMoves}
                                    botMoves={botMoves}
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
                                    setBlock={setBlock}
                                    setBotMoves={setBotMoves}
                                    botMoves={botMoves}
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
                                    setBlock={setBlock}
                                    setBotMoves={setBotMoves}
                                    botMoves={botMoves}
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
                                    botPlaying={props.status.red.bot}
                                    setBlock={setBlock}
                                    setBotMoves={setBotMoves}
                                    botMoves={botMoves}
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
                        block={block}
                        setBlock={setBlock}
                    />
                    <div className="playerName" style={{ textShadow: `2px 2px 5px ${turn}, -2px -2px 5px ${turn}` }}>
                        <div>
                            {name}'s
                        </div>
                        <div>
                            Turn
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Board
