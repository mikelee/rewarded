import todosReducer from './to-dos.reducer';
import { setToDos } from './to-dos.actions'

it('should set the todos', () => {
    const todos = [
        {to_do_id: 1, owner_id: 9, text: "todo 1", completed: 1},
        {to_do_id: 2, owner_id: 9, text: "todo 2", completed: 1},
        {to_do_id: 3, owner_id: 9, text: "todo 3", completed: 0},
    ];

    const intialState = {
        toDos: null
    };

    expect(todosReducer(intialState, setToDos(todos))).toEqual({toDos: todos});
});