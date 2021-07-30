import React from 'react';

import './add-item.styles.scss';

import { User } from '../../../types';

import { AddRounded } from '@material-ui/icons';

interface Props {
    type: string,
    currentUser: User,
    fetchTodos?: () => void,
    fetchRewards?: () => void
}

const addItem: React.FC<Props> = ({ type, currentUser, fetchTodos, fetchRewards }) => {

    const addTodo = () => {
        fetch(`/api/${type}/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(currentUser)
        })
        .then(() => {
            if (type === 'todo' && fetchTodos) {
                fetchTodos();
            } else if (fetchRewards) {
                fetchRewards();
            }
        });
    }

    return (
        <div className={`add-item add-item-${type}`} onClick={addTodo} >
            <div className='plus-container'>
                <AddRounded className='plus-icon' fontSize='large' />
            </div>
            <p className='add-item-text' >{type === 'todo' ? 'Add To Do' : 'Add Reward'}</p>
        </div>
    );
}

export default addItem;