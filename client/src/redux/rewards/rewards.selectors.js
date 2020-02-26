import { createSelector } from 'reselect';

const selectRewards = state => state.rewards;

export const setReward = createSelector(
    [selectRewards],
    reward => reward.selectedReward
);