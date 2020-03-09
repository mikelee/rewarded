import { toDosActionTypes } from './to-dos.types';

export const setToDos = toDos => ({
    type: toDosActionTypes.SET_TO_DOS,
    payload: toDos
});