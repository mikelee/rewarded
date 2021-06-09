import { rewardsActionTypes } from './rewards.types';
import { Reducer } from 'redux';
import { Action } from '../../../types';

import { Reward } from '../../../types';

interface State {
    rewards: Reward[] | null,
    selectedReward: Reward | null
}

const initalState = {
    rewards: null,
    selectedReward: null
}

const rewardReducer: Reducer<State, Action> = (state = initalState, action) => {
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
                rewards: state.rewards?.map(reward => reward.reward_id === action.payload.rewardId
                    ? {...reward, isUnlocked: action.payload.isUnlocked}
                    : {...reward}
                )
            }
        default:
            return state;
    }
}

export default rewardReducer;