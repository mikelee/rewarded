import requirementsActionTypes from './requirements.types';
import { Requirement } from '../../../types';

export const addRequirement = (requirement: Requirement) => ({
    type: requirementsActionTypes.ADD_REQUIREMENT,
    payload: requirement
});

export const setRequirements = (requirements: Requirement[]) => ({
    type: requirementsActionTypes.SET_REQUIREMENTS,
    payload: requirements
});

