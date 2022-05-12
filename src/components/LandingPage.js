import logo from '../assets/images/logo.png'
import greenTokenImage from '../assets/images/greenToken.png'
import yellowTokenImage from '../assets/images/yellowToken.png'
import blueTokenImage from '../assets/images/blueToken.png'
import redTokenImage from '../assets/images/redToken.png'
import botBlackWhite from '../assets/images/botBlackWhite.png'
import botColour from '../assets/images/botColour.png'

import React, { useState, useEffect } from 'react'

function LandingPage(props) {

    const [visibility, setVisibility] = useState('visible');

    const [green, setGreen] = useState({
        name: '',
        bot: false
    });

    const [yellow, setYellow] = useState({
        name: '',
        bot: false
    });

    const [blue, setBlue] = useState({
        name: '',
        bot: false
    });

    const [red, setRed] = useState({
        name: '',
        bot: false
    });

    let totalBots = 0, totalPlayers = 0, garbage = 0, n = 0;

    useEffect(() => {

        //? changing green name
        green.bot && green.name !== 'GreenBot' ? setGreen({ ...green, name: "GreenBot" }) :
            !green.bot && green.name === 'GreenBot' ? setGreen({ ...green, name: "" }) : n++;

    }, [green, n])

    useEffect(() => {

        //? changing yellow name
        yellow.bot && yellow.name !== 'YellowBot' ? setYellow({ ...yellow, name: "YellowBot" }) :
            !yellow.bot && yellow.name === 'YellowBot' ? setYellow({ ...yellow, name: "" }) : n++;

    }, [yellow, n])

    useEffect(() => {

        //? changing blue name
        blue.bot && blue.name !== 'BlueBot' ? setBlue({ ...blue, name: "BlueBot" }) :
            !blue.bot && blue.name === 'BlueBot' ? setBlue({ ...blue, name: "" }) : n++;

    }, [blue, n])

    useEffect(() => {

        //? changing red name
        red.bot && red.name !== 'RedBot' ? setRed({ ...red, name: "RedBot" }) :
            !red.bot && red.name === 'RedBot' ? setRed({ ...red, name: "" }) : n++;

    }, [red, n])

    const statusChange = () => {

        green.bot ? totalBots++ : totalPlayers++;
        yellow.bot ? totalBots++ : totalPlayers++;
        blue.bot ? totalBots++ : totalPlayers++;
        red.bot ? totalBots++ : totalPlayers++;

        green.name === '' ? totalPlayers-- : garbage++;
        yellow.name === '' ? totalPlayers-- : garbage++;
        blue.name === '' ? totalPlayers-- : garbage++;
        red.name === '' ? totalPlayers-- : garbage++;

        if ((totalPlayers > 0 && totalBots > 0) || totalPlayers > 1) {
            setVisibility('hidden');
            const dice = document.getElementById('sides-box');
            dice.style.animation = 'none';
            props.setStatus(
                {
                    green: {
                        name: green.name,
                        playing: green.name === '' ? false : true,
                        bot: green.bot
                    },
                    yellow: {
                        name: yellow.name,
                        playing: yellow.name === '' ? false : true,
                        bot: yellow.bot
                    },
                    blue: {
                        name: blue.name,
                        playing: blue.name === '' ? false : true,
                        bot: blue.bot
                    },
                    red: {
                        name: red.name,
                        playing: red.name === '' ? false : true,
                        bot: red.bot
                    }
                }
            )
        }
        else {
            window.alert("Atleast one player and one bot has to play!!!");
        }
    }

    return (
        <div className="startPage" style={{ visibility: `${visibility}` }}>
            <div className="noOfPlayers">
                <div className="logo player">
                    <img srcSet={logo} alt="" height="90%" />
                </div>
                <div className="player">
                    <img srcSet={greenTokenImage} alt="" width="15%" />
                    <input type="text" name="player Name" value={green.name} id="green" className="nameBox"
                        onChange={e => setGreen({ ...green, name: e.target.value })} />
                    <img srcSet={green.bot ? botColour : botBlackWhite}
                        className="bots" id="green" alt="" width="15%"
                        onClick={() => { setGreen({ ...green, bot: !green.bot }) }}
                    />
                </div>
                <div className="player">
                    <img srcSet={yellowTokenImage} alt="" width="15%" />
                    <input type="text" name="player Name" value={yellow.name} id="yellow" className="nameBox"
                        onChange={e => setYellow({ ...yellow, name: e.target.value })} />
                    <img srcSet={yellow.bot ? botColour : botBlackWhite}
                        className="bots" id="yellow" alt="" width="15%"
                        onClick={() => { setYellow({ ...yellow, bot: !yellow.bot }) }}
                    />
                </div>
                <div className="player">
                    <img srcSet={redTokenImage} alt="" width="15%" />
                    <input type="text" name="player Name" value={red.name} id="red" className="nameBox"
                        onChange={e => setRed({ ...red, name: e.target.value })} />
                    <img srcSet={red.bot ? botColour : botBlackWhite}
                        className="bots" id="red" alt="" width="15%"
                        onClick={() => { setRed({ ...red, bot: !red.bot }) }}
                    />
                </div>
                <div className="player">
                    <img srcSet={blueTokenImage} alt="" width="15%" />
                    <input type="text" name="player Name" value={blue.name} id="blue" className="nameBox"
                        onChange={e => setBlue({ ...blue, name: e.target.value })} />
                    <img srcSet={blue.bot ? botColour : botBlackWhite}
                        className="bots" id="blue" alt="" width="15%"
                        onClick={() => { setBlue({ ...blue, bot: !blue.bot }) }}
                    />
                </div>
                <div className="button player">
                    <button id="start" onClick={statusChange}>Start</button>
                </div>
                <div className="creator">
                    Developer :- Safeer Ansari
                </div>
            </div>
        </div>
    )
}

export default LandingPage
