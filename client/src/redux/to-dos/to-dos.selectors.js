import { createSelector } from 'reselect';

const selectToDos = state => state.toDos;

export const getToDos = createSelector(
    [selectToDos],
    toDos => toDos.toDos
);