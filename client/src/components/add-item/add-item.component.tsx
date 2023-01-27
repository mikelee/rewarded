import React from 'react';
import { fetchData } from '../../utils';

import './add-item.styles.scss';

import { User } from '../../../types';

import { AddRounded } from '@material-ui/icons';

interface Props {
    type: string,
    currentUser: User,
    fetchTodos?: () => void,
    fetchRewards?: () => void
}

const AddItem: React.FC<Props> = ({ type, currentUser, fetchTodos, fetchRewards }) => {

    const addTodoOrReward = async () => {
        const path = `/api/${type}/create`;
        const method = 'POST';
        const body = currentUser;

        await fetchData(path, method, body);
        
        if (type === 'todo' && fetchTodos) {
            fetchTodos();
        } else if (fetchRewards) {
            fetchRewards();
        }
    }

    return (
        <button className={`add-item add-item-${type}`} onClick={addTodoOrReward} >
            <div className='plus-container'>
                <AddRounded className='plus-icon' fontSize='large' />
            </div>
            <p className='add-item-text' >{type === 'todo' ? 'Add To Do' : 'Add Reward'}</p>
        </button>
    );
}

export default AddItem;