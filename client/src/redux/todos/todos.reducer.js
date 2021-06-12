import { todosActionTypes } from './todos.types';

const initialState = {
    todos: null
}

const todosReducer = (state = initialState, action) => {
    switch(action.type) {
        case todosActionTypes.SET_TODOS:
            return {
                ...state,
                todos: action.payload
            };
        default:
            return state;
    }
};

export default todosReducer;