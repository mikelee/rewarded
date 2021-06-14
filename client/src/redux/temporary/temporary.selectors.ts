import { createSelector } from 'reselect';
import { ReduxState } from '../../../types';

const selectTemporary = (state: ReduxState) => state.temporary;

export const getLoggedOutMessage = createSelector(
    [selectTemporary],
    temporary => temporary.loggedOutMessage
);