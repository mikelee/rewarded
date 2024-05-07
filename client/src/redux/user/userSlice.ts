import { createSlice } from '@reduxjs/toolkit';
import { UserReducer } from '../../../types';

const initialState: UserReducer = {
    currentUser: null,
    settings: {
        colorTheme: null
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        currentUserSet(state, action) {
            state.currentUser = action.payload;
        },
        colorThemeSet(state, action) {
            state.settings.colorTheme = action.payload;
        }
    }
});

export const { currentUserSet, colorThemeSet } = userSlice.actions;

export default userSlice.reducer;