import { createSelector } from 'reselect';

import { Requirement } from '../../../types';
import { ReduxState } from '../root-reducer';
import { sortItems } from '../../utils';

const selectRequirements = (state: ReduxState) => state.requirements;

export const getRequirements = createSelector(
    [
        selectRequirements,
        (state: ReduxState) => state.menu.sort
    ],
    (requirements, sort) => sortItems(requirements.requirements, sort)
);

export const getRewardRequirements = createSelector(
    [
        getRequirements,
        (state: ReduxState, rewardId: number) => rewardId
    ],
    (requirements, rewardId) => requirements?.filter((requirement: Requirement) => requirement.rewardId === rewardId)
);

export const getSelectedRewardRequirements = createSelector(
    [
        selectRequirements,
        (state: ReduxState) => state.rewards.selectedRewardId
    ],
    (requirements, selectedRewardId) => {
        const selectedRewardRequirements = new Set<number>();

        requirements.requirements.forEach(requirement => {
            if (requirement.rewardId === selectedRewardId) selectedRewardRequirements.add(requirement.todoId);
        });

        return selectedRewardRequirements;
    }
);