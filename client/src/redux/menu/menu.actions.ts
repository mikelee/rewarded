import menuActionTypes from './menu.types';

export const toggleMenuVisible = () => ({
    type: menuActionTypes.toggleMenuVisible
});

export const setSubmenuCategory = (category: string | null) => ({
    type: menuActionTypes.setSubmenuCategory,
    payload: category
});