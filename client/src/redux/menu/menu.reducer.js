import menuTypes from './menu.types';

const initialState = {
    visible: false,
    submenuCatergory: null
}

const menuReducer = (state = initialState, action) => {
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