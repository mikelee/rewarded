import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

interface OwnProps {
    type: string,
    completed: number,
    selectedRewardId?: number,
    associatedReward?: number,
    toggleTodoCompleted?: () => void,
    toggleRequirement?: () => void
}

type Props = OwnProps;

const ToggleButton: React.FC<Props> = ({ type, completed, selectedRewardId, associatedReward, toggleTodoCompleted, toggleRequirement }) => (
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