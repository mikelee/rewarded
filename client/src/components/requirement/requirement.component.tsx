import React from 'react';

import './requirement.styles.scss';

import { CheckRounded, Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface RequirementProps {
    todo_id: number,
    reward_id: number,
    text: string,
    completed: number,
    deleteRequirement: (todo_id: number) => React.FormEventHandler<HTMLFormElement>
}

const Requirement: React.FC<RequirementProps> = ({ todo_id, text, completed, deleteRequirement }) => (
    <div className='requirement'>
        <div className='requirement-check-space'>
            {completed
                ? <CheckRounded fontSize='large' />
                : null
            }
        </div>
        <form className='requirement-form' key={todo_id} onSubmit={deleteRequirement(todo_id)}>
            <p className='requirement-form-text'>{text}</p>
            <IconButton className='requirement-delete-button' type='submit'>
                <Clear className='requirement-delete-icon' />
            </IconButton>
        </form>
    </div>
);

export default Requirement;