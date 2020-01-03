import React from 'react';

import './to-do-item.styles.scss';

import { CheckRounded } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';

const ToDoItem = ({ text }) => (
    <div className='to-do-item'>
        <ToggleButton value="check" >
            <CheckRounded fontSize='large' />
        </ToggleButton>
        <p className='text'>{text}</p>
    </div>
);

export default ToDoItem;