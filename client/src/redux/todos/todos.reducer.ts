import todosActionTypes from './todos.types';
import { Reducer } from 'redux';
import { TodosReducer, Action } from '../../../types';

const initialState = {
    todos: []
}

const todosReducer: Reducer<TodosReducer, Action> = (state = initialState, action) => {
    switch(action.type) {
        case todosActionTypes.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case todosActionTypes.EDIT_TODO_COMPLETED:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.todoId === action.payload.todoId) {
                        return {
                            ...todo,
                            completed: action.payload.completed
                        }
                    }

                    return todo;
                })
            }
        case todosActionTypes.EDIT_TODO_TEXT:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.todoId === action.payload.todoId) {
                        return {
                            ...todo,
                            text: action.payload.text
                        }
                    }

                    return todo;
                })
            }
        case todosActionTypes.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.todoId !== action.payload)
            }
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