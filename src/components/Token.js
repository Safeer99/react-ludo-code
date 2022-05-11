import React, { useState, useEffect, useCallback } from 'react'

const board = [
    ['00', '00', '00', '00', '00', '00', '60', '61', '62', '00', '00', '00', '00', '00', '00'],
    ['00', 'g1', '00', 'g2', '00', '00', '59', '23', '22', '00', 'y1', '00', 'y2', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '58', '24', '63', '00', '00', '00', '00', '00', '00'],
    ['00', 'g3', '00', 'g4', '00', '00', '57', '25', '64', '00', 'y3', '00', 'y4', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '56', '26', '65', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '55', '27', '66', '00', '00', '00', '00', '00', '00'],
    ['98', '11', '51', '52', '53', '54', '00', '09', '00', '67', '68', '69', '70', '71', '72'],
    ['97', '12', '13', '14', '15', '16', '06', '00', '08', '38', '37', '36', '35', '34', '73'],
    ['96', '95', '94', '93', '92', '91', '00', '07', '00', '78', '77', '76', '75', '33', '74'],
    ['00', '00', '00', '00', '00', '00', '90', '49', '79', '00', '00', '00', '00', '00', '00'],
    ['00', 'r1', '00', 'r2', '00', '00', '89', '48', '80', '00', 'b1', '00', 'b2', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '88', '47', '81', '00', '00', '00', '00', '00', '00'],
    ['00', 'r3', '00', 'r4', '00', '00', '87', '46', '82', '00', 'b3', '00', 'b4', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '44', '45', '83', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '86', '85', '84', '00', '00', '00', '00', '00', '00']
]
const safeZone = ['11', '22', '33', '44', '58', '70', '82', '94'];
let count = 0;
let counter;
let check = 0;
let tempID, tempNumber;

function Token(props) {

    if (props.number > 0) {
        counter = props.number;
        tempNumber = props.number;
    }

    const [positionCount, setPositionCount] = useState(0);
    const [scale, setScale] = useState(0.8);
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);
    const [canMove, setCanMove] = useState(0);
    const [zIndex, setZIndex] = useState(1);

    //? moving bot (bot AI)
    useEffect(() => {
        if (props.turn === props.color && props.botPlaying && props.number !== 0 && props.botMoves.length < 4) {
            setZIndex(2);
            //? checking if the token is at the end and doesn't get the right number
            if (positionCount + props.number > 57) {
                props.setBotMoves(p => [...p, { id: props.id, move: '' }]);
            }
            //? check if the token is lock
            else if (positionCount === 0 && props.number !== 6) {
                props.setBotMoves(p => [...p, { id: props.id, move: '' }]);
            }
            //? checking if the token can be eligible for open
            else if (positionCount === 0 && props.number === 6) {
                props.setBotMoves(p => [...p, { id: props.id, move: 'O' }]);
            }
            //? checking if the token is eligible for run
            else if (positionCount + props.number === 57) {
                props.setBotMoves(p => [...p, { id: props.id, move: 'R' }]);
            }
            else {
                //? checking if the token is at safe spot after this turn
                safeZone.forEach(element => {
                    if (element === props.path[positionCount + props.number]) {
                        props.setBotMoves(p => [...p, { id: props.id, move: 'S' }]);
                        check++;
                    }
                });
                if (check === 0) {
                    //? checking if the token can kill another token
                    props.positions.forEach(element => {
                        if (element.color !== props.turn && element.p === props.path[positionCount + props.number]) {
                            props.setBotMoves(p => [...p, { id: props.id, move: 'K' }]);
                            check++;
                        }
                    });
                    if (check === 0) {
                        props.setBotMoves(p => [...p, { id: props.id, move: 'N' }]);
                    }
                    else { check = 0; }
                }
                else { check = 0; }
            }
        }
    }, [props, positionCount])

    //? deciding which token is eligible for move and then changing their size
    useEffect(() => {
        if (props.turn === props.color) {
            setZIndex(2);
            if (props.number === 6) {
                positionCount < 58 - props.number ? setScale(1.2) : count++;
            }
            else if (props.number === 0) {
                setScale(0.8);
                count = 0;
            }
            else if (props.number > 0) {
                positionCount < 58 - props.number && positionCount > 0 ? setScale(1.2) : count++;
            }
        }
        else {
            setZIndex(1);
        }
        if (count === 4) {
            props.setChangeTurn(true);
            props.setNumber(0);
            props.setBlock(true);
            count = 0;
        }
    }, [positionCount, props])

    //? changing the position of token on board
    const nextStep = (nextPosition) => {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const tile = board[row][col];
                if (tile === nextPosition) {
                    if (tile > '98') {
                        setX(col + 0.5);
                        setY(row + 0.5);
                    } else {
                        setX(col);
                        setY(row);
                    }
                }
            }
        }
    }

    //? move the token when position counter increases
    useEffect(() => {
        //? collision detecting then changing turn
        if (counter === 0 && props.id === tempID) {
            props.positions.forEach(element => {
                if (element.color !== props.color && element.p === props.path[positionCount]) {
                    //? checking for safe spots
                    safeZone.forEach(e => {
                        if (e === element.p) {
                            counter++;
                        }
                    });
                    if (counter === 0) {
                        props.setCollideTokenID(element.id);
                        tempNumber = 0;
                    }
                }
            });
            //? extra chance if collide
            props.setBlock(true);
            props.collideTokenID === "" && tempNumber !== 6 && tempNumber !== 0 && positionCount !== 58 ? props.setChangeTurn(true) : props.setChangeTurn(false);
            counter = -1;
            tempID = "";
            tempNumber = 0;
        }
        if (positionCount !== canMove) {
            nextStep(props.path[positionCount]);
            setCanMove(positionCount);

            //? updating the position of token in array
            let arr = { color: props.color, id: props.id, p: props.path[positionCount] }
            props.setPositions(items => {
                return items.map((item) => {
                    return item.id === props.id ? arr : item;
                })
            })
            tempID = arr.id;
            counter--;
        }
        //? returning token back at start
        if (props.id === props.collideTokenID) {
            // let j = positionCount;
            // setInterval(() => {
            //     if (j > 0) {
            //         setPositionCount(p => {
            //             return p - 1;
            //         });
            //         j--;
            //     }
            // }, 200);
            setTimeout(() => {
                setPositionCount(p => {
                    return p * 0;
                });
            }, 500);
            props.setCollideTokenID("");
        }
    }, [canMove, positionCount, props])

    //? moving the eligible token when the user clicks
    const move = useCallback(() => {
        if (scale === 1.2) {
            if (positionCount === 0) {
                //? increasing position counter
                setPositionCount(p => {
                    return p + 1;
                });
                props.setBlock(true);
            }
            else {
                //? incresing counter for moving multiple steps
                let i = 0;
                setInterval(() => {
                    if (i < props.number) {
                        setPositionCount(p => {
                            return p + 1;
                        });
                        i++;
                    }
                }, 350);
            }
            props.setNumber(0);
        }
    }, [props, scale, positionCount])

    useEffect(() => {
        if (count === 3 && scale === 1.2 && props.number !== 0) {
            count = 0;
            move();
        }
        //? move the chosen token
        else if (props.id === props.selectedID) {
            props.setSelectedID('');
            move();
        }
    }, [props, move, scale])

    return (
        <div className='tokens' id={`${props.id}`} onClick={move} style={{
            width: `${props.tokenSize}px`,
            height: `${props.tokenSize}px`,
            backgroundImage: `url(${props.image})`,
            zIndex: `${zIndex}`,
            transform: `translateX(${props.tokenSize * x}px) translateY(${props.tokenSize * y}px) scale(${scale})`
        }}>
        </div>
    )
}

export default Token
