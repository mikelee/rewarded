import temporaryActionTypes from './temporary.types';
import { Reducer } from 'redux';
import { TemporaryReducer, Action } from '../../../types';

const initialState = {
    loggedOutMessage: false
}

const temporaryReducer: Reducer<TemporaryReducer, Action> = (state = initialState, action) => {
    switch (action.type) {
        case (temporaryActionTypes.setLoggedOutMessage):
            return {
                ...state,
                loggedOutMessage: true
            }
        default:
            return {...state}
    }
}

export default temporaryReducer;