import rewardsReducer from './rewards.reducer';
import { setRewards, setSelectedRewardId, setIsUnlocked } from './rewards.actions';

const initialState = {
    rewards: null,
    selectedRewardId: null
};

const rewards = [
    {rewardId: 1, userId: 9, text: 'reward 1'},
    {rewardId: 2, userId: 9, text: 'reward 2'},
    {rewardId: 3, userId: 9, text: 'reward 3'}
];

const selectedRewardId = 1;

it('should set the rewards', () => {
    expect(rewardsReducer(initialState, setRewards(rewards))).toEqual({rewards: rewards, selectedRewardId: null});
});

it('should set the selected reward', () => {
    expect(rewardsReducer(initialState, setSelectedRewardId(selectedRewardId))).toEqual({rewards: null, selectedRewardId: 1});
});

it('should unlock reward with id: 1', () => {
    const unlockData = {
        rewardId: 1,
        isUnlocked: true
    };

    const state = {
        rewards: [
            {rewardId: 1, userId: 9, text: 'reward 1'},
            {rewardId: 2, userId: 9, text: 'reward 2'},
            {rewardId: 3, userId: 9, text: 'reward 3'}
        ],
        selectedRewardId: null
    };
    
    expect(rewardsReducer(state, setIsUnlocked(unlockData))).toEqual({
        rewards: [
            {rewardId: 1, userId: 9, text: 'reward 1', isUnlocked: true},
            {rewardId: 2, userId: 9, text: 'reward 2'},
            {rewardId: 3, userId: 9, text: 'reward 3'},
        ],
        selectedRewardId: null
    });
});

it('should lock reward with id: 2', () => {
    const unlockData = {
        rewardId: 2,
        isUnlocked: false
    };

    const state = {
        rewards: [
            {rewardId: 1, userId: 9, text: 'reward 1'},
            {rewardId: 2, userId: 9, text: 'reward 2'},
            {rewardId: 3, userId: 9, text: 'reward 3'}
        ],
        selectedRewardId: null
    };
    
    expect(rewardsReducer(state, setIsUnlocked(unlockData))).toEqual({
        rewards: [
            {rewardId: 1, userId: 9, text: 'reward 1'},
            {rewardId: 2, userId: 9, text: 'reward 2', isUnlocked: false},
            {rewardId: 3, userId: 9, text: 'reward 3'},
        ],
        selectedRewardId: null
    });
});