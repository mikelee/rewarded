import { toDosActionTypes } from './to-dos.types';

const initialState = {
    to_dos: null
}

const toDosReducer = (state = initialState, action) => {
    switch(action.type) {
        case toDosActionTypes.GET_TO_DOS:
            return {
                ...state,
                to_dos: action.payload
            };
        default:
            return state;
    }
};

export default toDosReducer;