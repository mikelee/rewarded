import requirementsActionTypes from './requirements.types';
import { Reducer } from 'redux';
import { RequirementsReducer, Action } from '../../../types';

const initialState = {
    requirements: []
}

const requirementsReducer: Reducer<RequirementsReducer, Action>  = (state = initialState, action) => {
    switch(action.type) {
        case requirementsActionTypes.ADD_REQUIREMENT:
            return {
                ...state,
                requirements: [...state.requirements, action.payload]
            }
        case requirementsActionTypes.EDIT_REQUIREMENT_TEXT:
            return {
                ...state,
                requirements:
                    state.requirements.map(requirement => {
                        if (requirement.todoId === action.payload.todoId) {
                            return {
                                ...requirement,
                                text: action.payload.text
                            }
                        }

                        return requirement;
                    })
            }
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