import React from 'react';

import './requirement-item.styles.scss';

import { CheckRounded, Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface OwnProps {
    todoId: number,
    rewardId: number,
    text: string,
    completed: number,
    deleteRequirement: (todoId: number) => React.FormEventHandler<HTMLFormElement>
}

type Props = OwnProps;

const RequirementItem: React.FC<Props> = ({ todoId, text, completed, deleteRequirement }) => (
    <div className='requirement'>
        <div className='requirement-check-container'>
            {completed
                ? <CheckRounded fontSize='large' />
                : <div className='requirement-check-placeholder'></div>
            }
        </div>
        <form className='requirement-form' key={todoId} onSubmit={deleteRequirement(todoId)}>
            <p className='requirement-form-text'>{text}</p>
            <IconButton className='requirement-delete-button' type='submit'>
                <Clear className='requirement-delete-icon' />
            </IconButton>
        </form>
    </div>
);

export default RequirementItem;