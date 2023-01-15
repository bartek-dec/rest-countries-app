import React from 'react';

const CountryCard = ({flag, name, population, region, capital}) => {
    return (
        <article className='card'>
            <img src={flag} className='card-img' alt='flag'/>
            <div className='card-content'>
                <h3 className='card-heading'>{name}</h3>
                <h4 className='card-info'>Population: <span>{population}</span></h4>
                <h4 className='card-info'>Region: <span>{region}</span></h4>
                <h4 className='card-info'>Capital: <span>{capital}</span></h4>
            </div>
        </article>
    );
};

export default CountryCard;