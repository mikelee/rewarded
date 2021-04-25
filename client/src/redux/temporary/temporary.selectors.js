import { createSelector } from 'reselect';

const selectTemporary = state => state.temporary;

export const getLoggedOutMessage = createSelector(
    [selectTemporary],
    temporary => temporary.loggedOutMessage
);