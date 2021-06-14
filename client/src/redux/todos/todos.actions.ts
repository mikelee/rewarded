import { todosActionTypes } from './todos.types';
import { Todo } from '../../../types';

export const setTodos = (todos: Todo[]) => ({
    type: todosActionTypes.SET_TODOS,
    payload: todos
});