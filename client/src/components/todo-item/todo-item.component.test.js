import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import testStore from '../../redux/testStore';
import { Provider } from 'react-redux';
import TodoItem from './todo-item.component';

const props = {
    id: 1,
    text: 'Todo 1',
    completed: true,
    selectedRewardId: null,
    selected: false,
    timestamp: '2023-03-08T06:49:33.913Z'
}

beforeEach(() => {
    render(
        <Provider store={testStore} >
            <TodoItem {...props} />
        </Provider>
    );
})

it('should change TodoItem text', () => {
    const UPDATED_TEXT = 'Updated Text';
    
    const todoText = screen.getByLabelText('todo-text');
    expect(todoText.value).toBe(props.text);
    
    fireEvent.change(todoText, { target: { value: UPDATED_TEXT } });
    expect(todoText.value).toEqual(UPDATED_TEXT);
});