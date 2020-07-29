import { setToDos } from './to-dos.actions';
import { toDosActionTypes } from './to-dos.types'

it('should create an action to set the todos', () => {
    const todos = [
        {to_do_id: 1, owner_id: 9, text: "todo 1", completed: 1},
        {to_do_id: 2, owner_id: 9, text: "todo 2", completed: 1},
        {to_do_id: 3, owner_id: 9, text: "todo 3", completed: 0},
    ];

    const expectedAction = {
        type: toDosActionTypes.SET_TO_DOS,
        payload: todos
    };

    expect(setToDos(todos)).toEqual(expectedAction);
});