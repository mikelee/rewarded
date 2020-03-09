import { createSelector } from 'reselect';

const selectRewards = state => state.rewards;

const selectSpecificReward = (state, props) => state.rewards.rewards.find(el => el.reward_id === props.id);

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
    reward => reward.isUnlocked
);