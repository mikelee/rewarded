import { userActionTypes } from './user.types';
import { User } from '../../../types';

export const setCurrentUser = (user: User) => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
  });

export const setColorTheme = (color: string) => ({
  type: userActionTypes.SET_COLOR_THEME,
  payload: color
});

export const clearAll = () => ({
  type: userActionTypes.CLEAR_ALL
});