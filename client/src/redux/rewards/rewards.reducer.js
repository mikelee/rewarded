import { rewardsActionTypes } from './rewards.types';

const initalState = {
    rewards: null,
    selectedReward: null
}

const rewardReducer = (state = initalState, action) => {
    switch(action.type) {
        case rewardsActionTypes.SET_REWARDS:
            return {
                ...state,
                rewards: action.payload
            }
        case rewardsActionTypes.SET_SELECTED_REWARD:
            return {
                ...state,
                selectedReward: action.payload
            }
        case rewardsActionTypes.SET_UNLOCKED:
            return {
                ...state,
                rewards: state.rewards.map(reward => reward.reward_id === action.payload.rewardId
                    ? {...reward, isUnlocked: action.payload.isUnlocked}
                    : {...reward}
                )
            }
        default:
            return state;
    }
}

export default rewardReducer;