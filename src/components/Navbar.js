import React, {useState} from 'react';
import {BsFillMoonStarsFill, BsSunFill} from 'react-icons/bs';

const Navbar = () => {
    const [isLight, setIsLight] = useState(false);

    const toggleMode = () => {
        setIsLight(!isLight);
        document.body.classList.toggle('light-mode')
    }

    return (
        <nav className='nav'>
            <div className='nav-wrapper'>
                <h2 className='nav-heading'>Where in the world?</h2>

                <button type='button' className='btn' onClick={toggleMode}>
                    {isLight ? <BsFillMoonStarsFill/> : <BsSunFill/>}
                    <span className='btn-text'>{isLight ? 'dark mode' : 'light mode'}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;