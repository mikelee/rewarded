import React from 'react';

import './homepage.styles.scss';
import checklist from '../../assets/checklist.svg';

const HomePage = () => (
    <div className='homepage'>
        <div className='homepage-text-container'>
            <h1 className='homepage-text'>Daily <br/> Achievements</h1>
            <p className='homepage-subtext'>Achieve greatness!</p>
        </div>
        <img className='homepage-graphic' src={checklist} alt='checklist'/>
    </div>
);

export default HomePage;