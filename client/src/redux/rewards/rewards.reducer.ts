import rewardsActionTypes from './rewards.types';
import { Reducer } from 'redux';
import { Action } from '../../../types';

import { RewardsReducer } from '../../../types';

const initalState = {
    rewards: null,
    selectedRewardId: null
}

const rewardsReducer: Reducer<RewardsReducer, Action> = (state = initalState, action) => {
    switch(action.type) {
        case rewardsActionTypes.SET_REWARDS:
            return {
                ...state,
                rewards: action.payload
            }
        case rewardsActionTypes.SET_SELECTED_REWARD_ID:
            return {
                ...state,
                selectedRewardId: action.payload
            }
        case rewardsActionTypes.SET_UNLOCKED:
            return {
                ...state,
                rewards: state.rewards?.map(reward => reward.rewardId === action.payload.rewardId
                    ? {...reward, isUnlocked: action.payload.isUnlocked}
                    : {...reward}
                )
            }
        default:
            return state;
    }
}

export default rewardsReducer;