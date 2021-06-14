import menuTypes from './menu.types';
import { Reducer } from 'redux';
import { MenuReducer, Action } from '../../../types';

const initialState = {
    visible: false,
    submenuCategory: null
}

const menuReducer: Reducer<MenuReducer, Action> = (state = initialState, action) => {
    switch(action.type) {
        case menuTypes.toggleMenuVisible:
            return {
                ...state,
                visible: !state.visible
            };
        case menuTypes.setSubmenuCategory:
            return {
                ...state,
                submenuCategory: action.payload
            };
        default:
            return state;
    }
}

export default menuReducer;