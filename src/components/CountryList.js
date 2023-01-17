import React from 'react';
import {CountryCard, Spinner, ErrorComp} from "./index";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';

const CountryList = () => {
    const {isLoading, countries, errorMsg} = useSelector((state) => state.country);

    if (isLoading) {
        return <Spinner/>
    }

    if (errorMsg) {
        return <ErrorComp message={errorMsg}/>
    }

    return (
        <>
            <section className='cards-container'>
                {countries.map((country) => {
                    const flag = country.flags.svg;
                    const name = country.name.common;
                    const {population, region, capital} = country;

                    return (
                        <Link to={`/country/${country.cca2}`} key={country.cca2} className='card'>
                            <CountryCard flag={flag} name={name} population={population} region={region}
                                         capital={capital}/>
                        </Link>)
                })}
            </section>
        </>
    );
};

export default CountryList;