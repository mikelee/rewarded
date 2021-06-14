import { todosActionTypes } from './todos.types';
import { Reducer } from 'redux';
import { TodoReducer, Action } from '../../../types';

const initialState = {
    todos: null
}

const todosReducer: Reducer<TodoReducer, Action> = (state = initialState, action) => {
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