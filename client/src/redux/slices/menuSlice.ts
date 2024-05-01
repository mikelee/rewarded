import { createSlice } from '@reduxjs/toolkit';
import { MenuReducer } from '../../../types';

const initialState: MenuReducer = {
    visible: false,
    sort: 'Newest First',
    submenuCategory: null
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        menuVisibleToggled(state, action) {
            state.visible = !state.visible;
        },
        sortSet(state, action) {
            state.sort = action.payload;
        },
        submenuCategorySet(state, action) {
            state.submenuCategory = action.payload;
        }
    }
});

export const { menuVisibleToggled, sortSet, submenuCategorySet } = menuSlice.actions;

export default menuSlice.reducer;