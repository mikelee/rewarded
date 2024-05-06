import { createSelector } from 'reselect';
import { sortItems } from '../../utils';

import { ReduxState } from '../root-reducer';

const selectRewards = (state: ReduxState) => state.rewards;

export const getRewards = createSelector(
    [
        selectRewards,
        (state: ReduxState) => state.menu.sort
    ],
    (rewards, sort) => sortItems(rewards.rewards, sort)
);

export const getSelectedRewardId = createSelector(
    [selectRewards],
    rewards => rewards.selectedRewardId
);