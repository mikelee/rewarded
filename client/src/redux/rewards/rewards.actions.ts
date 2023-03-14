import rewardsActionTypes from './rewards.types';

import { Reward, SetCompletedData } from '../../../types';

export const addReward = (reward: Reward) => ({
    type: rewardsActionTypes.ADD_REWARD,
    payload: reward
});

export const deleteReward = (rewardId: number) => ({
    type: rewardsActionTypes.DELETE_REWARD,
    payload: rewardId
});

export const editRewardText = (reward: Reward) => ({
    type: rewardsActionTypes.EDIT_REWARD_TEXT,
    payload: reward
});

export const setCompleted = (data: SetCompletedData) => ({
    type: rewardsActionTypes.SET_COMPLETED,
    payload: data
});

export const setRewards = (rewards: Reward[]) => ({
    type: rewardsActionTypes.SET_REWARDS,
    payload: rewards
});

export const setSelectedRewardId = (rewardId: number | null) => ({
    type: rewardsActionTypes.SET_SELECTED_REWARD_ID,
    payload: rewardId
});