import { createSelector } from 'reselect';
import { Reward } from '../../../types';
import { ReduxState } from '../root-reducer';
import { OwnProps } from '../../components/reward-item/reward-item.component';

const selectRewards = (state: ReduxState) => state.rewards;

const selectSpecificReward = (state: ReduxState, props: OwnProps) => {
    const rewards = state.rewards.rewards;
    
    return rewards?.find((reward: Reward) => reward.rewardId === props.id);
};

export const getRewards = createSelector(
    [selectRewards],
    rewards => rewards.rewards
);

export const getSelectedRewardId = createSelector(
    [selectRewards],
    rewards => rewards.selectedRewardId
);