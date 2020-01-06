import React from 'react';

import './to-do-item.styles.scss';

import { CheckRounded } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { Button, TextField } from '@material-ui/core';

const ToDoItem = ({ id, text }) => (
    <div className='to-do-item'>
        <div className='check-and-todo'>
            <ToggleButton className='toggle-button' value="check" >
                <CheckRounded fontSize='large' />
            </ToggleButton>
            <form id={`edit-form-${id}`} action={`/api/todo/${id}?_method=PUT`} method='POST'>
                <TextField id='standard-basic' name='text' className='text-field' placeholder='I want to...' defaultValue={text}/>
            </form>
        </div>
        <div className='buttons'>
            <Button form={`edit-form-${id}`}  className='edit-button' type ='submit' variant='outlined'>Edit</Button>
            <form className='delete-form' action={`/api/todo/${id}?_method=DELETE`} method='POST'>
                <Button type='submit' variant='contained' color='secondary'>Delete</Button>
            </form>
        </div>
    </div>
);

export default ToDoItem;