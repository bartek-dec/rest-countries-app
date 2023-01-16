import React, {useEffect} from 'react';
import {Form, Spinner, CountryCard} from '../components';
import {useSelector, useDispatch} from "react-redux";
import {getAllCountries} from "../features/country/countrySlice";

const Home = () => {
    const {isLoading, countries} = useSelector((state) => state.country);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCountries());
        // eslint-disable-next-line
    }, []);

    return (
        <main className='main'>
            <Form/>
            {isLoading ? <Spinner/> : (
                <section className='cards-container'>
                    {countries.map((country, index) => {
                        const flag = country.flags.svg;
                        const name = country.name.official;
                        const {population, region, capital} = country;
                        return <CountryCard key={index} flag={flag} name={name} population={population} region={region}
                                            capital={capital}/>
                    })}
                </section>
            )}
        </main>
    );
};

export default Home;