import React from 'react';
import {Link} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import {ErrorComp} from "../components";

const Error = () => {
    return (
        <main className='main error'>
            <Link to={'/'} className='btn-back'>
                <span><BiArrowBack/></span>Back
            </Link>
            <ErrorComp message={`404. Not Found`}/>
        </main>
    );
};

export default Error;