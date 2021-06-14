import { createSelector } from 'reselect';
import { ReduxState } from '../../../types';

const selectMenu = (state: ReduxState) => state.menu;

export const selectMenuVisible = createSelector(
    [selectMenu],
    menu => menu.visible
);

export const getSubmenuCategory = createSelector(
    [selectMenu],
    menu => menu.submenuCategory
);