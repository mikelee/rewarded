import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

const ToggleButton = ({ type, completed, selectedReward, associatedReward, toggleToDoCompleted, toggleRequirement }) => (
    <div className='toggle-button-container'>
        <button className={`toggle-button ${selectedReward === associatedReward && selectedReward !== null && type === 'forRequirement' ? 'selected' : ''}`} onClick={type === 'forTodo' ? toggleToDoCompleted : toggleRequirement}>
            {completed === 1
            ? <CheckRounded className={`check-icon ${selectedReward === associatedReward && selectedReward !== null && type === 'forRequirement' ? 'selected' : ''}`} fontSize='large'/>
            : null
            }
        </button>
    </div>
);

export default ToggleButton;