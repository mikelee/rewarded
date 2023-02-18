import todosActionTypes from './todos.types';
import { Todo } from '../../../types';

export const addTodo = (todo: Todo) => ({
    type: todosActionTypes.ADD_TODO,
    payload: todo
});

export const editTodoText = (todo: Todo) => ({
    type: todosActionTypes.EDIT_TODO_TEXT,
    payload: todo
})

export const setTodos = (todos: Todo[]) => ({
    type: todosActionTypes.SET_TODOS,
    payload: todos
});