import { createSelector } from 'reselect';

const selectToDos = state => state.to_dos;

export const selectToDos = createSelector(
    [selectToDos],
    to_do => to_do
);