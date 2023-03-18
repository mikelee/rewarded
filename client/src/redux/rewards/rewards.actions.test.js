import { setRewards, setSelectedRewardId, setCompleted } from './rewards.actions';
import rewardsActionTypes from './rewards.types';

it('should create an action to set the rewards', () => {
    const rewards = [
        {rewardId: 1, text: 'reward 1', completed: false, timestamp: '2023-03-08T06:49:53.064Z'},
        {rewardId: 2, text: 'reward 2', completed: true, timestamp: '2023-03-08T06:49:58.519Z'},
        {rewardId: 3, text: 'reward 3', completed: true, timestamp: '2023-03-08T06:50:03.270Z'}
    ];

    const expectedAction = {
        type: rewardsActionTypes.SET_REWARDS,
        payload: rewards
    };

    expect(setRewards(rewards)).toEqual(expectedAction);
});

it('should create an action to set a selected reward', () => {
    const selectedRewardId = {id: 2};

    const expectedAction = {
        type: rewardsActionTypes.SET_SELECTED_REWARD_ID,
        payload: selectedRewardId
    };

    expect(setSelectedRewardId(selectedRewardId)).toEqual(expectedAction);
});

it('should create an action to set the reward with rewardId: 2 as completed', () => {
    const setCompletedData = {
        rewardId: 2,
        completed: true
    };

    const expectedAction = {
        type: rewardsActionTypes.SET_COMPLETED,
        payload: setCompletedData
    };

    expect(setCompleted(setCompletedData)).toEqual(expectedAction);
});

it('should create an action to set the reward with rewardId: 2 as not completed', () => {
    const setCompletedData = {
        rewardId: 2,
        completed: false
    };

    const expectedAction = {
        type: rewardsActionTypes.SET_COMPLETED,
        payload: setCompletedData
    };

    expect(setCompleted(setCompletedData)).toEqual(expectedAction);
});