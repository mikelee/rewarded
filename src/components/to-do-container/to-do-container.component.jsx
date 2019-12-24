import React from 'react';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';

const ToDoContainer = () => (
    <div className='to-do-container'>
        <ToDoItem text='To-Do 1' />
        <ToDoItem text='To-Do 2' />
        <ToDoItem text='To-Do 3' />
    </div>
);

export default ToDoContainer;