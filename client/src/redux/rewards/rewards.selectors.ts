import { createSelector } from 'reselect';
import { ReduxState, Reward } from '../../../types';

const selectRewards = (state: ReduxState) => state.rewards;

const selectSpecificReward = (reduxState: ReduxState, prop: Reward) => {
    const rewards = reduxState.rewards.rewards;
    
    return rewards?.find((reward: Reward) => reward.reward_id === prop.reward_id);
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