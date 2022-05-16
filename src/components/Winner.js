import React, { useState, useEffect } from 'react'
import crownFirst from '../assets/images/crownFirst.png'
import crownSecond from '../assets/images/crownSecond.png'
import crownThird from '../assets/images/crownThird.png'

const Winner = (props) => {

    const [visibility, setVisibility] = useState('hidden');
    const [image, setImage] = useState(crownFirst);
    const [position, setPosition] = useState({
        x: 0, y: 0
    })

    useEffect(() => {
        if (visibility === 'hidden') {
            props.color === 'green' ? setPosition({ x: 0, y: 0 }) :
                props.color === 'yellow' ? setPosition({ x: 60, y: 0 }) :
                    props.color === 'blue' ? setPosition({ x: 60, y: 60 }) :
                        props.color === 'red' ? setPosition({ x: 0, y: 60 }) : setPosition({ x: 0, y: 0 })

            if (props.rank === 'first' && props.color !== '') {
                setImage(crownFirst);
                setVisibility('visible');
            } else if (props.rank === 'second' && props.color !== '') {
                setImage(crownSecond);
                setVisibility('visible');
            } else if (props.rank === 'third' && props.color !== '') {
                setImage(crownThird);
                setVisibility('visible');
            }
        }

    }, [image, props, visibility])

    return (
        <div className='winner' style={{
            width: "40%",
            height: "40%",
            position: "absolute",
            pointerEvents: "none",
            left: `${position.x}%`,
            top: `${position.y}%`,
            visibility: `${visibility}`,
            zIndex: "2"
        }}>
            <img srcSet={image} alt="" width="100%" />
        </div>
    )
}

export default Winner
