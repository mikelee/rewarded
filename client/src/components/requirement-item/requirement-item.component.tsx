import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../utils';

import './requirement-item.styles.scss';

import { CheckRounded, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { requirementDeleted } from '../../redux/requirements/requirementsSlice';

interface Props {
    todoId: number,
    rewardId: number,
    text: string,
    completed: boolean
}

const RequirementItem: React.FC<Props> = ({ todoId, rewardId, text, completed }) => {
    const dispatch = useDispatch();

    const handleDeleteRequirement = (todoId: number) => {
        return async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const path = '/api/requirement/delete';
            const method = 'DELETE';
            const body = {
                reward_id: rewardId,
                todo_id: todoId
            };

            const deletedRequirement: { todoId: number, rewardId: number } = await fetchData(path, method, body);

            dispatch(requirementDeleted({ todoId: deletedRequirement.todoId, rewardId: deletedRequirement.rewardId }));
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
            <form className='requirement-form' key={todoId} onSubmit={handleDeleteRequirement(todoId)}>
                <p className='requirement-form-text'>{text}</p>
                <IconButton className='requirement-delete-button' type='submit'>
                    <Clear className='requirement-delete-icon' />
                </IconButton>
            </form>
        </div>
    );
}

export default RequirementItem;