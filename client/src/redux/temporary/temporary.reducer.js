import { temporaryTypes } from './temporary.types';

const initialState = {
    loggedOutMessage: false
}

const temporaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case (temporaryTypes.setLoggedOutMessage):
            return {
                ...state,
                loggedOutMessage: true
            }
        default:
            return {...state}
    }
}

export default temporaryReducer;