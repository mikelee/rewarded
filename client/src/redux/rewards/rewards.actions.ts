import rewardsActionTypes from './rewards.types';

import { Reward, SetIsUnlockedData } from '../../../types';

export const setRewards = (rewards: Reward[]) => ({
    type: rewardsActionTypes.SET_REWARDS,
    payload: rewards
});

export const setSelectedReward = (reward: Reward) => ({
    type: rewardsActionTypes.SET_SELECTED_REWARD,
    payload: reward
});

export const setIsUnlocked = (data: SetIsUnlockedData) => ({
    type: rewardsActionTypes.SET_UNLOCKED,
    payload: data
});