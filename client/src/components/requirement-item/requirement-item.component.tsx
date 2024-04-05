import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../utils';

import './requirement-item.styles.scss';

import { Dispatch } from 'redux';

import { CheckRounded, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { deleteRequirement } from '../../redux/requirements/requirements.actions'; 

interface OwnProps {
    todoId: number,
    rewardId: number,
    text: string,
    completed: boolean
}

interface DispatchProps {
    deleteRequirement: (todoId: number, rewardId: number) => void
}

type Props = OwnProps & DispatchProps;

const RequirementItem: React.FC<Props> = ({ todoId, rewardId, text, completed, deleteRequirement }) => {

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

            deleteRequirement(deletedRequirement.todoId, deletedRequirement.rewardId);
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteRequirement: (todoId: number, rewardId: number) => dispatch(deleteRequirement(todoId, rewardId))
});

export default connect(null, mapDispatchToProps)(RequirementItem);