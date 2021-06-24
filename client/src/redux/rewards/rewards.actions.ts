import rewardsActionTypes from './rewards.types';

import { Reward, SetIsUnlockedData } from '../../../types';

export const setRewards = (rewards: Reward[]) => ({
    type: rewardsActionTypes.SET_REWARDS,
    payload: rewards
});

export const setSelectedRewardId = (rewardId: number | null) => ({
    type: rewardsActionTypes.SET_SELECTED_REWARD_ID,
    payload: rewardId
});

export const setIsUnlocked = (data: SetIsUnlockedData) => ({
    type: rewardsActionTypes.SET_UNLOCKED,
    payload: data
});