import { createSelector } from 'reselect';
import { ReduxState, Reward } from '../../../types';

const selectRewards = (state: ReduxState) => state.rewards;

const selectSpecificReward = (state: ReduxState, props: any) => {
    const rewards = state.rewards.rewards;
    
    return rewards?.find((reward: Reward) => reward.rewardId === props.id);
};

export const getRewards = createSelector(
    [selectRewards],
    rewards => rewards.rewards
);

export const getSelectedRewardId = createSelector(
    [selectRewards],
    rewards => rewards.selectedRewardId
);

export const getIsUnlocked = createSelector(
    [selectSpecificReward],
    reward => reward?.isUnlocked
);