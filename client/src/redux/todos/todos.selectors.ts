import { createSelector } from 'reselect';
import { sortItems } from '../../utils';

import { ReduxState } from '../root-reducer';

const selectTodos = (state: ReduxState) => state.todos;

export const getTodos = createSelector(
    [
        selectTodos,
        (state: ReduxState) => state.menu.sort
    ],
    (todos, sort) => sortItems(todos.todos, sort)
);