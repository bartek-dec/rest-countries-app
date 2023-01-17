import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {getSingleCountry} from "../features/country/countrySlice";
import {useSelector, useDispatch} from "react-redux";
import {BiArrowBack} from 'react-icons/bi';
import {SiOpenstreetmap} from 'react-icons/si';
import {Spinner, ErrorComp} from "../components";

const SingleCountry = () => {
    const {id} = useParams();
    const {isLoading, singleCountry, errorMsg} = useSelector((state) => state.country);
    const dispatch = useDispatch();
    const {
        flag, countryName, nativeName, currencies, languages, population, region, subregion, capital, tld, map,
        neighbours
    } = singleCountry;

    useEffect(() => {
        dispatch(getSingleCountry(id));
        // eslint-disable-next-line
    }, [id]);


    if (isLoading) {
        return (
            <main className='main country'>
                <Spinner/>
            </main>
        )
    }

    if (!singleCountry.countryName) {
        return (
            <main className='main country'>
                <Link to={'/'} className='btn-back'>
                    <span><BiArrowBack/></span>Back
                </Link>
                <ErrorComp message={errorMsg}/>
            </main>
        )
    }

    return (
        <main className='main country'>
            <Link to={'/'} className='btn-back'>
                <span><BiArrowBack/></span>Back
            </Link>

            <div className='country-container'>
                <div className='country-flag'>
                    <img src={flag} alt='flag' className='country-flag-img'/>
                </div>

                <div className='country-detail'>
                    <h2 className='country-name'>{countryName}</h2>

                    <div className='country-info'>
                        <h3>Native Name: <span>{nativeName}</span></h3>
                        <h3>Population: <span>{population}</span></h3>
                        <h3>Region: <span>{region}</span></h3>
                        <h3>Sub Region: <span>{subregion}</span></h3>
                        <h3>Capitol: <span>{capital}</span></h3>
                    </div>

                    <div className='country-info'>
                        <h3>Top Level Domain: <span>{tld}</span></h3>
                        <h3>Currencies: <span>{currencies}</span></h3>
                        <h3>Languages: <span>{languages}</span></h3>
                        <h3>Map Location:
                            <span>
                                <a href={map} target='_blank' rel='noreferrer'><SiOpenstreetmap/></a>
                            </span>
                        </h3>
                    </div>

                    <div className='country-borders'>
                        <h3>Border Countries:</h3>
                        <div className='btn-container'>
                            {neighbours.length === 0 ? 'No neighbours' : neighbours.map((item, index) => {
                                return (
                                    <Link to={`/country/${item.cca2}`} className='btn-back' key={index}>
                                        {`${item.name.common}`}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SingleCountry;