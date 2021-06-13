import todosReducer from './todos.reducer';
import { setTodos } from './todos.actions'

it('should set the todos', () => {
    const todos = [
        {todo_id: 1, user_id: 9, text: "todo 1", completed: 1},
        {todo_id: 2, user_id: 9, text: "todo 2", completed: 1},
        {todo_id: 3, user_id: 9, text: "todo 3", completed: 0},
    ];

    const intialState = {
        todos: null
    };

    expect(todosReducer(intialState, setTodos(todos))).toEqual({todos: todos});
});