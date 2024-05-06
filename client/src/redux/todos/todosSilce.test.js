import todosReducer, { todosSet } from './todosSlice';

it('should set the todos', () => {
    const todos = [
        {todoId: 1, userId: 9, text: "todo 1", completed: 1},
        {todoId: 2, userId: 9, text: "todo 2", completed: 1},
        {todoId: 3, userId: 9, text: "todo 3", completed: 0},
    ];

    const intialState = {
        todos: null
    };

    expect(todosReducer(intialState, todosSet(todos))).toEqual({todos: todos});
});