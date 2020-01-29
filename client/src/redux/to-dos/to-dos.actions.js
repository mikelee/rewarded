import { toDosActionTypes } from './to-dos.types';

export const getToDos = to_dos => ({
    type: toDosActionTypes.GET_TO_DOS,
    payload: to_dos
});