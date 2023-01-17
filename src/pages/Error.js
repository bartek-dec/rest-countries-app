import React from 'react';
import {BiArrowBack} from "react-icons/bi";
import {ErrorComp, Button} from "../components";

const Error = () => {
    return (
        <main className='main error'>
            <Button destination={`/`} icon={<BiArrowBack/>} text={`Back`}/>
            <ErrorComp message={`404. Not Found`}/>
        </main>
    );
};

export default Error;