import React from 'react'
import WinnerDisplaying from './WinnerDisplaying'

import greenTokenImage from '../assets/images/greenToken.png'
import yellowTokenImage from '../assets/images/yellowToken.png'
import blueTokenImage from '../assets/images/blueToken.png'
import redTokenImage from '../assets/images/redToken.png'
import trophy from '../assets/images/trophy.gif'

const EndingPage = (props) => {

    const RestartGame = () => {
        props.setActive("start");
    }

    return (
        <div className='endPage'>
            <div className="box  pagePopUpAnimation" style={{ background: "#161928" }}>
                <div className="logo player" style={{ height: "25%" }}>
                    <img srcSet={trophy} alt="" height="95%" />
                </div>
                {props.rank.map((element) => {
                    if (element.color === 'green') {
                        return <div className="player" key={element.color} >
                            <WinnerDisplaying image={greenTokenImage} name={props.status.green.name} p={element.p} />
                        </div>
                    } else if (element.color === 'yellow') {
                        return <div className="player" key={element.color} >
                            <WinnerDisplaying image={yellowTokenImage} name={props.status.yellow.name} p={element.p} />
                        </div>
                    } else if (element.color === 'blue') {
                        return <div className="player" key={element.color} >
                            <WinnerDisplaying image={blueTokenImage} name={props.status.blue.name} p={element.p} />
                        </div>
                    } else if (element.color === 'red') {
                        return <div className="player" key={element.color} >
                            <WinnerDisplaying image={redTokenImage} name={props.status.red.name} p={element.p} />
                        </div>
                    }
                    return null;
                })}
                <div className="button player">
                    <button id="start" onClick={RestartGame}>Restart</button>
                </div>
                <div className="creator">
                    Developer :- Safeer Ansari
                </div>
            </div>
        </div>
    )
}

export default EndingPage
