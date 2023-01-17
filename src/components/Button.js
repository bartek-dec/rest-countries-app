import React from 'react';
import {Link} from "react-router-dom";

const Button = ({destination, icon, index, text}) => {
    return (
        <Link to={destination} className='btn-back' key={index}>
            <span>{icon}</span>{text}
        </Link>
    );
};

export default Button;