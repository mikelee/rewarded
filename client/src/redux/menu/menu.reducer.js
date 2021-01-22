import menuTypes from './menu.types';

const initialState = {
    visible: false
}

const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case menuTypes.toggleMenuVisible:
            return {
                ...state,
                visible: !state.visible
            };
        default:
            return state;
    }
}

export default menuReducer;