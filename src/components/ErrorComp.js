import React from 'react';

const ErrorComp = ({message}) => {
    return (
        <article className='error'>
            <h2>{message}</h2>
        </article>
    );
};

export default ErrorComp;