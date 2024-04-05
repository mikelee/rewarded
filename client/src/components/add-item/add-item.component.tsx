import React from 'react';
import { fetchData } from '../../utils';

import './add-item.styles.scss';

import { Add } from '@mui/icons-material';

interface Props {
    type: string,
    addItemToRedux: (item: any) => void
}

const AddItem: React.FC<Props> = ({ type, addItemToRedux }) => {

    const addItem = async () => {
        const path = `/api/${type}/create`;
        const method = 'POST';

        const newItem = await fetchData(path, method);
        
        addItemToRedux(newItem);
    }

    return (
        <button className='add-item' onClick={addItem} >
            <div className='plus-container'>
                <Add className='plus-icon' fontSize='large' />
            </div>
            <p className='add-item-text'>{type === 'todo' ? 'Add To Do' : 'Add Reward'}</p>
        </button>
    );
}

export default AddItem;