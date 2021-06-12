import { todosActionTypes } from './todos.types';

export const setTodos = todos => ({
    type: todosActionTypes.SET_TODOS,
    payload: todos
});