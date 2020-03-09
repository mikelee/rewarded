import { createSelector } from 'reselect';

const selectRequirements = state => state.requirements;

export const getRequirements = createSelector(
    [selectRequirements],
    requirements => requirements.requirements
);