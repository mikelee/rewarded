import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

interface ToggleButtonProps {
    type: string,
    completed: number,
    selectedReward?: number,
    associatedReward?: number,
    toggleTodoCompleted?: () => void,
    toggleRequirement?: () => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ type, completed, selectedReward, associatedReward, toggleTodoCompleted, toggleRequirement }) => (
    <div className='toggle-button-container'>
        <button className={`toggle-button ${selectedReward === associatedReward && selectedReward !== null && type === 'forRequirement' ? 'selected' : ''}`} onClick={type === 'forTodo' ? toggleTodoCompleted : toggleRequirement}>
            {completed === 1
            ? <CheckRounded className={`check-icon ${selectedReward === associatedReward && selectedReward !== null && type === 'forRequirement' ? 'selected' : ''}`} fontSize='large'/>
            : null
            }
        </button>
    </div>
);

export default ToggleButton;