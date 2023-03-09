import { createSelector } from 'reselect';

import { Requirement } from '../../../types';
import { ReduxState } from '../root-reducer';
import { sortItems } from '../../utils';
import { OwnProps } from '../../components/reward-item/reward-item.component';

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
        (state: ReduxState, props: OwnProps) => props
    ],
    (requirements, props) => requirements?.filter((requirement: Requirement) => requirement.rewardId === props.id)
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