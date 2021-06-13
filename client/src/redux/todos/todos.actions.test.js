import { setTodos } from './todos.actions';
import { todosActionTypes } from './todos.types'

it('should create an action to set the todos', () => {
    const todos = [
        {todo_id: 1, user_id: 9, text: "todo 1", completed: 1},
        {todo_id: 2, user_id: 9, text: "todo 2", completed: 1},
        {todo_id: 3, user_id: 9, text: "todo 3", completed: 0},
    ];

    const expectedAction = {
        type: todosActionTypes.SET_TODOS,
        payload: todos
    };

    expect(setTodos(todos)).toEqual(expectedAction);
});