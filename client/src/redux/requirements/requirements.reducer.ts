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
        case requirementsActionTypes.DELETE_ITEM_REQUIREMENTS:
            return {
                ...state,
                requirements: action.payload.itemType === 'todo'
                ? state.requirements.filter(requirement => requirement.todoId !== action.payload.itemId)
                : state.requirements.filter(requirement => requirement.rewardId !== action.payload.itemId)
            }
        case requirementsActionTypes.DELETE_REQUIREMENT:
            return {
                ...state,
                requirements: state.requirements.filter(
                    requirement => requirement.todoId !== action.payload.todoId || requirement.rewardId !== action.payload.rewardId
                )
            }
        case requirementsActionTypes.EDIT_REQUIREMENT_COMPLETED:
            return {
                ...state,
                requirements:
                    state.requirements.map(requirement => {
                        if (requirement.todoId === action.payload.todoId) {
                            return {
                                ...requirement,
                                completed: action.payload.completed
                            }
                        }

                        return requirement;
                    })
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