import { createSelector } from 'reselect';
import { ReduxState } from '../../../types';

const selectRequirements = (state: ReduxState) => state.requirements;

export const getRequirements = createSelector(
    [selectRequirements],
    requirements => requirements.requirements
);