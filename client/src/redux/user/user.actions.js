import { userActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
  });

export const setColorTheme = color => ({
  type: userActionTypes.SET_COLOR_THEME,
  payload: color
});