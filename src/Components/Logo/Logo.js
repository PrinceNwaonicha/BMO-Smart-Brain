import React from "react";
import Tilt from 'react-tilt'
import BMO from  './BMO.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className="ma mt0 pa3">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 125, width: 125 }} >
                <div className="Tilt-inner pa3">
                    <img src={BMO} alt=""/>
                </div>
            </Tilt>
        </div>
    )
};

export default Logo;