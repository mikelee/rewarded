import requirementsActionTypes from './requirements.types';
import { Reducer } from 'redux';
import { RequirementsReducer, Action } from '../../../types';

const initialState = {
    requirements: []
}

const requirementsReducer: Reducer<RequirementsReducer, Action>  = (state = initialState, action) => {
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

export default requirementsReducer;