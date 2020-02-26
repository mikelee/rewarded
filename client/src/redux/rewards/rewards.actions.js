import { rewardsActionTypes } from './rewards.types';

export const selectReward = reward => ({
    type: rewardsActionTypes.SELECT_REWARD,
    payload: reward
});