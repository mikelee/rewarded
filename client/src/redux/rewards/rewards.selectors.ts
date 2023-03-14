import { createSelector } from 'reselect';
import { sortItems } from '../../utils';

import { Reward } from '../../../types';
import { ReduxState } from '../root-reducer';
import { OwnProps } from '../../components/reward-item/reward-item.component';

const selectRewards = (state: ReduxState) => state.rewards;

const selectSpecificReward = (state: ReduxState, props: OwnProps) => {
    const rewards = state.rewards.rewards;
    
    return rewards?.find((reward: Reward) => reward.rewardId === props.id);
};

export const getRewards = createSelector(
    [
        selectRewards,
        (state: ReduxState) => state.menu.sort
    ],
    (rewards, sort) => sortItems(rewards.rewards, sort)
);

export const getSelectedRewardId = createSelector(
    [selectRewards],
    rewards => rewards.selectedRewardId
);