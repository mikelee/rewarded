import React from 'react';
import { fetchData } from '../../utils';

import './add-item.styles.scss';

import { User } from '../../../types';

import { AddRounded } from '@material-ui/icons';

interface Props {
    type: string,
    currentUser: User,
    addItemToRedux: (item: any) => void
}

const AddItem: React.FC<Props> = ({ type, currentUser, addItemToRedux }) => {

    const addItem = async () => {
        const path = `/api/${type}/create`;
        const method = 'POST';
        const body = currentUser;

        const newItem = await fetchData(path, method, body);
        
        addItemToRedux(newItem);
    }

    return (
        <button className='add-item' onClick={addItem} >
            <div className='plus-container'>
                <AddRounded className='plus-icon' fontSize='large' />
            </div>
            <p className='add-item-text'>{type === 'todo' ? 'Add To Do' : 'Add Reward'}</p>
        </button>
    );
}

export default AddItem;