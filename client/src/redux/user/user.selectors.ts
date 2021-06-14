import { createSelector } from 'reselect';
import { ReduxState } from '../../../types';

const selectUser = (state: ReduxState) => state.user;

export const getCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const getColorTheme = createSelector(
    [selectUser],
    user => user.settings.colorTheme
);