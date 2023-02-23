import rewardsActionTypes from './rewards.types';
import { Reducer } from 'redux';
import { Action } from '../../../types';

import { RewardsReducer } from '../../../types';

const initalState = {
    rewards: [],
    selectedRewardId: null
}

const rewardsReducer: Reducer<RewardsReducer, Action> = (state = initalState, action) => {
    switch(action.type) {
        case rewardsActionTypes.ADD_REWARD:
            return {
                ...state,
                rewards: [...state.rewards, action.payload]
            }
        case rewardsActionTypes.DELETE_REWARD:
            return {
                ...state,
                rewards: state.rewards.filter(reward => reward.rewardId !== action.payload)
            }
        case rewardsActionTypes.EDIT_REWARD_TEXT:
            return {
                ...state,
                rewards: state.rewards.map(reward => {
                    if (reward.rewardId === action.payload.rewardId) {
                        return {
                            ...reward,
                            text: action.payload.text
                        }
                    }

                    return reward;
                })
            }
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