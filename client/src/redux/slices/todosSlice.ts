import { createSlice } from '@reduxjs/toolkit';
import { TodosReducer } from '../../../types';

const initialState: TodosReducer = {
    todos: []
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action) {
            state.todos.push(action.payload);
        },
        todoDeleted(state, action) {
            state.todos.filter(todo => todo.todoId !== action.payload);
        },
        todoCompletedToggled(state, action) {
            const matchingTodo = state.todos.find(todo => todo.todoId === action.payload.id);

            if (matchingTodo) matchingTodo.completed = action.payload.completed;
        },
        todoTextEdited(state, action) {
            const matchingTodo = state.todos.find(todo => todo.todoId === action.payload.id);

            if (matchingTodo) matchingTodo.text = action.payload.text;
        },
        todosSet(state, action) {
            state.todos = action.payload;
        }
    }
});

export const { todoAdded, todoDeleted, todoCompletedToggled, todoTextEdited, todosSet } = todosSlice.actions;

export default todosSlice.reducer;