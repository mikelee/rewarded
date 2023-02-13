import { createSelector } from 'reselect';
import { ReduxState } from '../root-reducer';

const selectTodos = (state: ReduxState) => state.todos;

export const getTodos = createSelector(
    [selectTodos],
    todos => todos.todos
);