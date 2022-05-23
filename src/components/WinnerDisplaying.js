import React, { useEffect, useState } from 'react'

const WinnerDisplaying = (props) => {

    const [position, setPosition] = useState("0");

    useEffect(() => {
        if (props.p === 1 && position === '0') {
            setPosition("st");
        } else if (props.p === 2 && position === '0') {
            setPosition("nd");
        } else if (props.p === 3 && position === '0') {
            setPosition("rd");
        } else if (props.p === 4 && position === '0') {
            setPosition("th");
        }
    }, [props, position])

    return (
        <div className="winners" style={{ borderBottom: '2px solid #330867' }}>
            <h1 className='rank'>{props.p}<sup style={{ fontSize: '1.1rem', marginBottom: '15px' }}>{position}</sup></h1>
            <h1 className='winningPlayersName'>{props.name}</h1>
            <div className='tokenImage' >
                <img srcSet={props.image} alt="" height="50vh" />
            </div>
        </div >
    )
}

export default WinnerDisplaying
