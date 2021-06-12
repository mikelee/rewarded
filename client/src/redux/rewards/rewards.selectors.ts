import { createSelector } from 'reselect';
import { ReduxState, Reward } from '../../../types';

const selectRewards = (state: ReduxState) => state.rewards;

const selectSpecificReward = (state: ReduxState, props: any) => {
    const rewards = state.rewards.rewards;
    
    return rewards?.find((reward: Reward) => reward.reward_id === props.id);
};

export const getRewards = createSelector(
    [selectRewards],
    rewards => rewards.rewards
);

export const getSelectedReward = createSelector(
    [selectRewards],
    reward => reward.selectedReward
);

export const getIsUnlocked = createSelector(
    [selectSpecificReward],
    reward => reward?.isUnlocked
);