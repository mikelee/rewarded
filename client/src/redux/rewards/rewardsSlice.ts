import { createSlice } from '@reduxjs/toolkit';
import { RewardsReducer } from '../../../types';

const initialState: RewardsReducer = {
    rewards: [],
    selectedRewardId: null
}

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        rewardAdded(state, action) {
            state.rewards.push(action.payload);
        },
        rewardDeleted(state, action) {
            state.rewards = state.rewards.filter(reward => reward.rewardId !== action.payload);
        },
        rewardCompletedToggled(state, action) {
            const matchingReward = state.rewards.find(reward => reward.rewardId === action.payload.rewardId);
            
            if (matchingReward) matchingReward.completed = action.payload.completed;
        },
        rewardTextEdited(state, action) {
            const matchingReward = state.rewards.find(reward => reward.rewardId === action.payload.rewardId);

            if (matchingReward) matchingReward.text = action.payload.text;
        },
        rewardsSet(state, action) {
            state.rewards = action.payload;
        },
        selectedRewardIdSet(state, action) {
            state.selectedRewardId = action.payload;
        }
    }
});

export const { rewardAdded, rewardDeleted, rewardCompletedToggled, rewardTextEdited, rewardsSet, selectedRewardIdSet } = rewardsSlice.actions;

export default rewardsSlice.reducer;