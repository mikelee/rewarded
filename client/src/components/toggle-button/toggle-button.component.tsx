import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

interface ToggleButtonProps {
    type: string,
    completed: number,
    selectedRewardId?: number,
    associatedReward?: number,
    toggleTodoCompleted?: () => void,
    toggleRequirement?: () => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ type, completed, selectedRewardId, associatedReward, toggleTodoCompleted, toggleRequirement }) => (
    <div className='toggle-button-container'>
        <button className={`toggle-button ${selectedRewardId === associatedReward && selectedRewardId !== null && type === 'forRequirement' ? 'selected' : ''}`} onClick={type === 'forTodo' ? toggleTodoCompleted : toggleRequirement}>
            {completed === 1
            ? <CheckRounded className={`check-icon ${selectedRewardId === associatedReward && selectedRewardId !== null && type === 'forRequirement' ? 'selected' : ''}`} fontSize='large'/>
            : null
            }
        </button>
    </div>
);

export default ToggleButton;