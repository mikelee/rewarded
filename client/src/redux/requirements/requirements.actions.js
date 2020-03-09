import { requirementsActionTypes } from './requirements.types';

export const setRequirements = requirements => ({
    type: requirementsActionTypes.SET_REQUIREMENTS,
    payload: requirements
});

