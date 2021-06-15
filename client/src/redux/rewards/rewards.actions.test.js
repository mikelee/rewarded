import { setRewards, setSelectedReward, setIsUnlocked } from './rewards.actions';
import rewardsActionTypes from './rewards.types';

it('should create an action to set the rewards', () => {
    const rewards = [
        {reward_id: 1, user_id: 9, text: 'reward 1'},
        {reward_id: 2, user_id: 9, text: 'reward 2'},
        {reward_id: 3, user_id: 9, text: 'reward 3'}
    ];

    const expectedAction = {
        type: rewardsActionTypes.SET_REWARDS,
        payload: rewards
    };

    expect(setRewards(rewards)).toEqual(expectedAction);
});

it('should create an action to set a selected reward', () => {
    const selectedReward = {id: 2};

    const expectedAction = {
        type: rewardsActionTypes.SET_SELECTED_REWARD,
        payload: selectedReward
    };

    expect(setSelectedReward(selectedReward)).toEqual(expectedAction);
});

it('should create an action to set the reward with rewardId: 2 as unlocked', () => {
    const unlockData = {
        rewardId: 2,
        isUnlocked: true
    };

    const expectedAction = {
        type: rewardsActionTypes.SET_UNLOCKED,
        payload: unlockData
    };

    expect(setIsUnlocked(unlockData)).toEqual(expectedAction);
});

it('should create an action to set the reward with rewardId: 2 as locked', () => {
    const unlockData = {
        rewardId: 2,
        isUnlocked: false
    };

    const expectedAction = {
        type: rewardsActionTypes.SET_UNLOCKED,
        payload: unlockData
    };

    expect(setIsUnlocked(unlockData)).toEqual(expectedAction);
});