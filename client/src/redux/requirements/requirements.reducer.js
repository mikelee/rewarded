import { requirementsActionTypes } from './requirements.types';

const initialState = {
    requirements: null
}

const requirementReducer = (state = initialState, action) => {
    switch(action.type) {
        case requirementsActionTypes.SET_REQUIREMENTS:
            return {
                ...state,
                requirements: action.payload
            }
        default:
            return state;
    }
}

export default requirementReducer;