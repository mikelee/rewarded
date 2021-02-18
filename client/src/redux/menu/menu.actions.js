import menuActionTypes from './menu.types';

export const toggleMenuVisible = () => ({
    type: menuActionTypes.toggleMenuVisible
});

export const setSubmenuCategory = category => ({
    type: menuActionTypes.setSubmenuCategory,
    payload: category
});