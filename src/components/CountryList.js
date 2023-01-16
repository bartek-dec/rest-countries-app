import React from 'react';
import {CountryCard, Spinner} from "./index";
import {useSelector} from "react-redux";

const CountryList = () => {
    const {isLoading, countries} = useSelector((state) => state.country);

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='cards-container'>
                {countries.map((country, index) => {
                    const flag = country.flags.svg;
                    const name = country.name.official;
                    const {population, region, capital} = country;
                    return <CountryCard key={index} flag={flag} name={name} population={population} region={region}
                                        capital={capital}/>
                })}
            </section>
        </>
    );
};

export default CountryList;