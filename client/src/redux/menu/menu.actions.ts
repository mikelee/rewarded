import menuActionTypes from './menu.types';
import { SortOrder } from '../../components/sort/sort.component';

export const toggleMenuVisible = () => ({
    type: menuActionTypes.toggleMenuVisible
});

export const setSort = (sortOrder: SortOrder) => ({
    type: menuActionTypes.setSort,
    payload: sortOrder
});

export const setSubmenuCategory = (category: string | null) => ({
    type: menuActionTypes.setSubmenuCategory,
    payload: category
});