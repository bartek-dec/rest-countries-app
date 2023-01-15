import React, {useState} from 'react';
import {RxMagnifyingGlass} from 'react-icons/rx';
import {BiChevronDown} from 'react-icons/bi';

const Form = () => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState('Filter by Region');
    const options = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    const handleClick = (input) => {
        setSelected(input);
        setIsActive(false);
    }
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