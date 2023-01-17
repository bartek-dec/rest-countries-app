import React from 'react';
import {Link} from "react-router-dom";

const Button = ({destination, icon, text}) => {
    return (
        <Link to={destination} className='btn-back'>
            <span>{icon}</span>{text}
        </Link>
    );
};

export default Button;