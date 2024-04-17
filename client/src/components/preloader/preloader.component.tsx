import React from 'react';

import './preloader.styles.scss';

const Preloader: React.FC = () => (
    <div className='preloader' data-testid='preloader'>
        <div className='ripple'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Preloader;