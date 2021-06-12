import { createSelector } from 'reselect';

const selectTodos = state => state.todos;

export const getTodos = createSelector(
    [selectTodos],
    todos => todos.todos
);