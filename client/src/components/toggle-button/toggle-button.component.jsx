import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

const ToggleButton = ({ type, completed, selectedReward, associatedReward, toggleToDoCompleted, toggleRequirement }) => (
    <div className='toggle-button-container'>
        {type === 'forTodo'
        ?
            <button className={`toggle-button ${completed === 1 ? 'completed' : ''}`} onClick={toggleToDoCompleted}>
                <CheckRounded className={`check-icon ${completed === 1 ? 'completed' : ''}`} fontSize='large'/>
            </button>
        :
            <button className={`toggle-button ${selectedReward === associatedReward ? 'completed' : ''}`} onClick={toggleRequirement}>
                <CheckRounded className={`check-icon ${selectedReward === associatedReward ? 'completed' : ''}`} fontSize='large'/>
            </button>
        }
    </div>
);

export default ToggleButton;