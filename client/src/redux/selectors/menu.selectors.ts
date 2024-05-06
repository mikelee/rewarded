import { createSelector } from 'reselect';
import { ReduxState } from '../root-reducer';

const selectMenu = (state: ReduxState) => state.menu;

export const selectMenuVisible = createSelector(
    [selectMenu],
    menu => menu.visible
);

export const getSort = createSelector(
    [selectMenu],
    menu => menu.sort
);

export const getSubmenuCategory = createSelector(
    [selectMenu],
    menu => menu.submenuCategory
);