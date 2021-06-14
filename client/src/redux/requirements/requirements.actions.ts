import { requirementsActionTypes } from './requirements.types';
import { Requirement } from '../../../types';

export const setRequirements = (requirements: Requirement[]) => ({
    type: requirementsActionTypes.SET_REQUIREMENTS,
    payload: requirements
});

