import { toDosActionTypes } from './to-dos.types';

const initialState = {
    toDos: null
}

const toDosReducer = (state = initialState, action) => {
    switch(action.type) {
        case toDosActionTypes.SET_TO_DOS:
            return {
                ...state,
                toDos: action.payload
            };
        default:
            return state;
    }
};

export default toDosReducer;