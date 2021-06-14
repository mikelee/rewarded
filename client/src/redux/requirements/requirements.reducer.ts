import { requirementsActionTypes } from './requirements.types';
import { Reducer } from 'redux';
import { RequirementReducer, Action } from '../../../types';

const initialState = {
    requirements: null
}

const requirementReducer: Reducer<RequirementReducer, Action>  = (state = initialState, action) => {
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