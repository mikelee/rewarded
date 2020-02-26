import { rewardsActionTypes } from './rewards.types';

const initalState = {
    selectedReward: null
}

const rewardReducer = (state = initalState, action) => {
    switch(action.type) {
        case rewardsActionTypes.SELECT_REWARD:
            return {
                ...state,
                selectedReward: action.payload
            }
        default:
            return state;
    }
}

export default rewardReducer;