import { rewardsActionTypes } from './rewards.types';

export const setRewards = rewards => ({
    type: rewardsActionTypes.SET_REWARDS,
    payload: rewards
});

export const setSelectedReward = reward => ({
    type: rewardsActionTypes.SET_SELECTED_REWARD,
    payload: reward
});

export const setIsUnlocked = data => ({
    type: rewardsActionTypes.SET_UNLOCKED,
    payload: data
});