import React from 'react';
import { fetchData } from '../../utils';

import './requirement-item.styles.scss';

import { CheckRounded, Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface OwnProps {
    todoId: number,
    rewardId: number,
    text: string,
    completed: number,
    fetchRequirements: () => void
}

type Props = OwnProps;

const RequirementItem: React.FC<Props> = ({ todoId, rewardId, text, completed, fetchRequirements }) => {

    const deleteRequirement = (todoId: number) => {
        return async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const path = '/api/requirement/delete';
            const method = 'DELETE';
            const body = {
                reward_id: rewardId,
                todo_id: todoId
            };

            await fetchData(path, method, body);

            fetchRequirements();
        }
    }
    
    return (
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
}

export default RequirementItem;