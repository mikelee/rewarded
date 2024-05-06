import rewardsReducer, { rewardCompletedToggled, rewardsSet, selectedRewardIdSet } from './rewardsSlice';

const initialState = {
    rewards: [],
    selectedRewardId: null
};

const rewards = [
    {rewardId: 1, text: 'reward 1', completed: false, timestamp: '2023-03-08T06:49:53.064Z'},
    {rewardId: 2, text: 'reward 2', completed: true, timestamp: '2023-03-08T06:49:58.519Z'},
    {rewardId: 3, text: 'reward 3', completed: true, timestamp: '2023-03-08T06:50:03.270Z'}
];

const selectedRewardId = 1;

it('should set the rewards', () => {
    expect(rewardsReducer(initialState, rewardsSet(rewards))).toEqual({rewards: rewards, selectedRewardId: null});
});

it('should set the selected reward', () => {
    expect(rewardsReducer(initialState, selectedRewardIdSet(selectedRewardId))).toEqual({rewards: [], selectedRewardId: 1});
});

it('should set reward with id: 1 as completed', () => {
    const setCompletedData = {
        rewardId: 1,
        completed: true
    };

    const state = {
        rewards: rewards,
        selectedRewardId: null
    };
    
    expect(rewardsReducer(state, rewardCompletedToggled(setCompletedData))).toEqual({
        rewards: [
            {rewardId: 1, text: 'reward 1', completed: true, timestamp: '2023-03-08T06:49:53.064Z'},
            {rewardId: 2, text: 'reward 2', completed: true, timestamp: '2023-03-08T06:49:58.519Z'},
            {rewardId: 3, text: 'reward 3', completed: true, timestamp: '2023-03-08T06:50:03.270Z'}
        ],
        selectedRewardId: null
    });
});

it('should set reward with id: 2 as not completed', () => {
    const setCompletedData = {
        rewardId: 2,
        completed: false
    };

    const state = {
        rewards: rewards,
        selectedRewardId: null
    };
    
    expect(rewardsReducer(state, rewardCompletedToggled(setCompletedData))).toEqual({
        rewards: [
            {rewardId: 1, text: 'reward 1', completed: false, timestamp: '2023-03-08T06:49:53.064Z'},
            {rewardId: 2, text: 'reward 2', completed: false, timestamp: '2023-03-08T06:49:58.519Z'},
            {rewardId: 3, text: 'reward 3', completed: true, timestamp: '2023-03-08T06:50:03.270Z'}
        ],
        selectedRewardId: null
    });
});