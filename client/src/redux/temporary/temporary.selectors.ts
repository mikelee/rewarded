import { createSelector } from 'reselect';
import { ReduxState } from '../root-reducer';

const selectTemporary = (state: ReduxState) => state.temporary;

export const getLoggedOutMessage = createSelector(
    [selectTemporary],
    temporary => temporary.loggedOutMessage
);