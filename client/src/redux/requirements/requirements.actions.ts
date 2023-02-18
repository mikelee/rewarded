import requirementsActionTypes from './requirements.types';
import { Requirement, Todo } from '../../../types';

export const addRequirement = (requirement: Requirement) => ({
    type: requirementsActionTypes.ADD_REQUIREMENT,
    payload: requirement
});

export const editRequirementText = (todo: Todo) => ({
    type: requirementsActionTypes.EDIT_REQUIREMENT_TEXT,
    payload: todo
});

export const setRequirements = (requirements: Requirement[]) => ({
    type: requirementsActionTypes.SET_REQUIREMENTS,
    payload: requirements
});

