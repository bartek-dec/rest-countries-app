import React, {useState, useEffect} from 'react';
import {RxMagnifyingGlass} from 'react-icons/rx';
import {BiChevronDown} from 'react-icons/bi';
import {useDispatch, useSelector} from "react-redux";
import {filterCountriesByRegion, setRegion} from '../features/country/countrySlice';

const Form = () => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState('Filter by Region');
    const options = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const dispatch = useDispatch();
    const {region} = useSelector((state) => state.country);

    const handleClick = (input) => {
        setSelected(input);
        setIsActive(false);
        dispatch(setRegion(input));
    }

    useEffect(() => {
        if (region) {
            dispatch(filterCountriesByRegion(region));
        }
        // eslint-disable-next-line
    }, [region]);

    return (
        <section className='form-wrapper'>
            <form className='form'>
                <div className='form-row'>
                    <span className='form-icon'><RxMagnifyingGlass/></span>
                    <input type='text' className='form-input' placeholder='Search for a country...'/>
                </div>

                <div className='dropdown'>
                    <div className='dropdown-btn' tabIndex='1' onClick={() => setIsActive(!isActive)}>
                        {selected}
                        <span className='custom-arrow'><BiChevronDown/></span>
                    </div>

                    {isActive && (
                        <div className='dropdown-content'>
                            {options.map((option, index) => {
                                return <div key={index} className='dropdown-item'
                                            onClick={() => handleClick(option)}>{option}</div>
                            })}
                        </div>
                    )}

                </div>
            </form>
        </section>
    );
};

export default Form;