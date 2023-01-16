import React from 'react';
import {CountryCard, Spinner} from "./index";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';

const CountryList = () => {
    const {isLoading, countries} = useSelector((state) => state.country);

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='cards-container'>
                {countries.map((country) => {
                    const flag = country.flags.svg;
                    const name = country.name.official;
                    const commonName = country.name.common;
                    const {population, region, capital} = country;
                    // return <CountryCard key={index} flag={flag} name={name} population={population} region={region}
                    //                     capital={capital}/>
                    return (
                        <Link to={`/country/${commonName}`} key={country.ccn3} className='card'>
                            <CountryCard flag={flag} name={name} population={population} region={region}
                                         capital={capital}/>
                        </Link>)
                })}
            </section>
        </>
    );
};

export default CountryList;