import { createSelector } from 'reselect';
import { ReduxState } from '../root-reducer';

const selectRequirements = (state: ReduxState) => state.requirements;

export const getRequirements = createSelector(
    [selectRequirements],
    requirements => requirements.requirements
);