import rewardReducer from './rewards.reducer';
import { setRewards, setSelectedReward, setIsUnlocked } from './rewards.actions';

const initialState = {
    rewards: null,
    selectedReward: null
};

const rewards = [
    {reward_id: 1, user_id: 9, text: 'reward 1'},
    {reward_id: 2, user_id: 9, text: 'reward 2'},
    {reward_id: 3, user_id: 9, text: 'reward 3'}
];

const selectedReward = 1;

it('should set the rewards', () => {
    expect(rewardReducer(initialState, setRewards(rewards))).toEqual({rewards: rewards, selectedReward: null});
});

it('should set the selected reward', () => {
    expect(rewardReducer(initialState, setSelectedReward(selectedReward))).toEqual({rewards: null, selectedReward: 1});
});

it('should unlock reward with id: 1', () => {
    const unlockData = {
        rewardId: 1,
        isUnlocked: true
    };

    const state = {
        rewards: [
            {reward_id: 1, user_id: 9, text: 'reward 1'},
            {reward_id: 2, user_id: 9, text: 'reward 2'},
            {reward_id: 3, user_id: 9, text: 'reward 3'}
        ],
        selectedReward: null
    };
    
    expect(rewardReducer(state, setIsUnlocked(unlockData))).toEqual({
        rewards: [
            {reward_id: 1, user_id: 9, text: 'reward 1', isUnlocked: true},
            {reward_id: 2, user_id: 9, text: 'reward 2'},
            {reward_id: 3, user_id: 9, text: 'reward 3'},
        ],
        selectedReward: null
    });
});

it('should lock reward with id: 2', () => {
    const unlockData = {
        rewardId: 2,
        isUnlocked: false
    };

    const state = {
        rewards: [
            {reward_id: 1, user_id: 9, text: 'reward 1'},
            {reward_id: 2, user_id: 9, text: 'reward 2'},
            {reward_id: 3, user_id: 9, text: 'reward 3'}
        ],
        selectedReward: null
    };
    
    expect(rewardReducer(state, setIsUnlocked(unlockData))).toEqual({
        rewards: [
            {reward_id: 1, user_id: 9, text: 'reward 1'},
            {reward_id: 2, user_id: 9, text: 'reward 2', isUnlocked: false},
            {reward_id: 3, user_id: 9, text: 'reward 3'},
        ],
        selectedReward: null
    });
});