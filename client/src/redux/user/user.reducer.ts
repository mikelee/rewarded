import { userActionTypes } from './user.types';
import { Reducer } from 'redux';
import { UserReducer, Action } from '../../../types';

const INITIAL_STATE = {
  currentUser: null,
  settings: {
    colorTheme: null
  }
};

const userReducer: Reducer<UserReducer, Action> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case userActionTypes.SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.payload
        };
      case userActionTypes.SET_COLOR_THEME:
        return {
          ...state,
          settings: {
            ...state.settings,
            colorTheme: action.payload
          }
        }
      default:
        return state;
    }
  };
  
  export default userReducer;