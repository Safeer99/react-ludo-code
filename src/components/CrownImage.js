import React, { useState, useEffect } from 'react'
import crownFirst from '../assets/images/crownFirst.png'
import crownSecond from '../assets/images/crownSecond.png'
import crownThird from '../assets/images/crownThird.png'

const CrownImage = (props) => {

    const [visibility, setVisibility] = useState('hidden');
    const [image, setImage] = useState();
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const imageSelector = (p) => {
        if (p === 1) {
            return crownFirst;
        } else if (p === 2) {
            return crownSecond;
        } else if (p === 3) {
            return crownThird;
        }
    }

    useEffect(() => {
        if (visibility === 'hidden') {
            if (props.color === 'green') {
                setVisibility('visible');
                setPosition({ x: 0, y: 0 })
                setImage(imageSelector(props.p));
            } else if (props.color === 'yellow') {
                setVisibility('visible');
                setPosition({ x: 60, y: 0 })
                setImage(imageSelector(props.p));
            } else if (props.color === 'blue') {
                setVisibility('visible');
                setPosition({ x: 60, y: 60 })
                setImage(imageSelector(props.p));
            } else if (props.color === 'red') {
                setVisibility('visible');
                setPosition({ x: 0, y: 60 })
                setImage(imageSelector(props.p));
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

export default CrownImage
