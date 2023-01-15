import React from 'react';
import {Form, Spinner, CountryCard} from '../components';
import {countries} from "../data";

const Home = () => {
    return (
        <main className='main'>
            <Form/>
            {/*<Spinner/>*/}
            <section className='cards-container'>
                {countries.map((country, index) => {
                    return <CountryCard key={index} {...country}/>
                })}
            </section>
        </main>
    );
};

export default Home;