import { createSelector } from 'reselect';
import { Requirement } from '../../../types';
import { ReduxState } from '../root-reducer';
import { OwnProps } from '../../components/reward-item/reward-item.component';

const selectRequirements = (state: ReduxState) => state.requirements;

export const getRequirements = createSelector(
    [selectRequirements],
    requirements => requirements.requirements
);

export const getRewardRequirements = createSelector(
    [
        selectRequirements,
        (state: ReduxState, props: OwnProps) => props
    ],
    (requirements, props) => requirements.requirements?.filter((requirement: Requirement) => requirement.rewardId === props.id)
);