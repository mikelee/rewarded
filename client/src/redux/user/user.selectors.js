import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const getCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const getColorTheme = createSelector(
    [selectUser],
    user => user.settings.colorTheme
);