import React from 'react';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';

import data1 from '../../data';

const ToDoContainer = () => (
    <div className='to-do-container'>
        {data1.toDos.map(toDo => <ToDoItem text={toDo.text} />)}
    </div>
);

export default ToDoContainer;