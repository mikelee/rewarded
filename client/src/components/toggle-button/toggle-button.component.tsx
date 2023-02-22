import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

interface OwnProps {
    type: string,
    completed: number,
    selectedRewardId?: number,
    selected?: boolean,
    toggleTodoCompleted?: () => void,
    toggleRequirement?: () => void
}

type Props = OwnProps;

const ToggleButton: React.FC<Props> = ({ type, completed, selectedRewardId, selected, toggleTodoCompleted, toggleRequirement }) => {

    const determineClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.detail > 1) return;

        if (type === 'forTodo' && toggleTodoCompleted) {
            toggleTodoCompleted();
        } else if (type === 'forRequirement' && toggleRequirement) {
            toggleRequirement();
        }
    }

    return (
        <div className='toggle-button-container'>
            <button className={`toggle-button ${selected && selectedRewardId !== null && type === 'forRequirement' ? 'selected' : ''}`} onClick={event => determineClick(event)} >
                {completed
                ? <CheckRounded className={`check-icon ${selected && selectedRewardId !== null && type === 'forRequirement' ? 'selected' : ''}`} fontSize='large'/>
                : null
                }
            </button>
        </div>
    );
}

export default ToggleButton;