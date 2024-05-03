import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils';

import './reward-item.styles.scss';

import { Requirement, Reward } from '../../../types';
import { ReduxState } from 'redux/root-reducer';

import RequirementItem from '../requirement-item/requirement-item.component';
import { IconButton } from '@mui/material';
import { Add, ClearRounded } from '@mui/icons-material';

import { rewardDeleted, rewardTextEdited, rewardCompletedToggled, selectedRewardIdSet } from '../../redux/slices/rewardsSlice';
import { getRewardRequirements } from '../../redux/requirements/requirements.selectors';
import { itemRequirementsDeleted } from '../../redux/slices/requirementsSlice';

export interface OwnProps {
    id: number,
    text: string,
    completed: boolean
}

type Props = OwnProps;

const RewardItem: React.FC<Props> = ({ id, text, completed }) => {
    const rewardRequirements = useSelector((state: ReduxState) => getRewardRequirements(state, id));

    const dispatch = useDispatch();

    useEffect(() => {
        if (rewardRequirements) {
            const isCompleted = checkCompleted(rewardRequirements);

            if (isCompleted !== completed) {
                updateCompleted(isCompleted);
            }
        }
    }, [rewardRequirements]);

    const editReward = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const changedText = (event.target as HTMLInputElement).value;

        const path = '/api/reward/update';
        const method = 'PUT';
        const body = {
            reward_id: id,
            text: changedText
        };

        const updatedReward = await fetchData(path, method, body);

        dispatch(rewardTextEdited(updatedReward))
    }

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const path = '/api/reward/delete';
        const method = 'DELETE';
        const body = { reward_id: id };

        const { reward }: { reward: Reward } = await fetchData(path, method, body);

        dispatch(rewardDeleted(reward.rewardId));
        dispatch(itemRequirementsDeleted({ itemType: 'reward', itemId: reward.rewardId }));
    }

    const addOrDeleteRequirement = async () => {
        dispatch(selectedRewardIdSet(id));
    }

    const checkCompleted = (requirements: Requirement[]) => {
        return requirements.every(requirement => requirement.completed);
    }

    const updateCompleted = async (isCompleted: boolean) => {
        const path = '/api/reward/complete';
        const method = 'PUT';
        const body = {
            reward_id: id,
            completed: isCompleted
        };

        const updatedReward: Reward = await fetchData(path, method, body);

        const setCompletedData = {
            rewardId: updatedReward.rewardId,
            completed: updatedReward.completed
        }

        dispatch(rewardCompletedToggled(setCompletedData));
    }

    return (
        <div className={`reward ${!completed ? 'locked': ''}`} data-testid={`reward-${id}`}>
            <form className='reward-form' id={`reward-form-${id}`} onBlur={editReward} onSubmit={editReward} >
                <input className='reward-form-textfield' defaultValue={text} name='text' />
            </form>
            <div className='reward-right-side'>
                <div className='reward-to-complete'>
                    <h3 className='requirements-title'>Requirements</h3>
                    <div className='requirements-list'>
                        {
                            rewardRequirements?.map(rewardRequirements =>
                                <RequirementItem key={rewardRequirements.todoId} {...rewardRequirements}/>
                            )
                        }
                    </div>
                </div>
                <div className='reward-buttons'>
                    <IconButton className='requirement-add-button' onClick={addOrDeleteRequirement}>
                        <Add className='requirement-add-icon' fontSize='large'/>
                    </IconButton>
                    <form className='reward-delete-form' onSubmit={handleDelete}>
                        <IconButton className='reward-delete-form-button' type='submit'>
                            <ClearRounded className='reward-clear-icon' fontSize='large' />
                        </IconButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RewardItem;