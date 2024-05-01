import { createSlice } from '@reduxjs/toolkit';
import { TemporaryReducer } from '../../../types';

const initialState: TemporaryReducer = {
    loggedOutMessage: false
}

const temporarySlice = createSlice({
    name: 'temporary',
    initialState,
    reducers: {
        loggedOutMessageSet(state, action) {
            state.loggedOutMessage = true;
        }
    }
});

export const { loggedOutMessageSet } = temporarySlice.actions;

export default temporarySlice.reducer;