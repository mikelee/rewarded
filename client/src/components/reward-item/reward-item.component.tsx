import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';

import './reward-item.styles.scss';

import { Dispatch } from 'redux';
import { Action, Requirement, Reward, SetCompletedData } from '../../../types';

import RequirementItem from '../requirement-item/requirement-item.component';
import { IconButton } from '@mui/material';
import { Add, ClearRounded } from '@mui/icons-material';

import { getSelectedRewardId } from '../../redux/rewards/rewards.selectors';
import { deleteReward, editRewardText, setCompleted, setSelectedRewardId } from '../../redux/rewards/rewards.actions';
import { getRewardRequirements } from '../../redux/requirements/requirements.selectors';
import { deleteItemRequirements } from '../../redux/requirements/requirements.actions';

export interface OwnProps {
    id: number,
    text: string,
    completed: boolean
}

interface StateProps {
    rewardRequirements: Requirement[] | undefined,
    selectedRewardId: number | null
}

interface DispatchProps {
    deleteItemRequirements: (itemType: 'reward', itemId: number) => void,
    deleteReward: (rewardId: number) => void,
    editRewardText: (reward: Reward) => void,
    setCompleted: (data: SetCompletedData) => void,
    setSelectedRewardId: (rewardId: number | null) => void
}

type Props = OwnProps & StateProps & DispatchProps;

const RewardItem: React.FC<Props> = ({ id, text, completed, rewardRequirements, deleteItemRequirements, deleteReward, editRewardText, setCompleted, setSelectedRewardId }) => {

    const [itemText, setItemText] = useState(text);

    useEffect(() => {
        if (rewardRequirements) {
            const isCompleted = checkCompleted(rewardRequirements);

            if (isCompleted !== completed) {
                updateCompleted(isCompleted);
            }
        }
    }, [rewardRequirements]);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        setItemText(value);
    }

    const editReward = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const path = '/api/reward/update';
        const method = 'PUT';
        const body = {
            reward_id: id,
            text: itemText
        };

        const updatedReward = await fetchData(path, method, body);

        editRewardText(updatedReward);
    }

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const path = '/api/reward/delete';
        const method = 'DELETE';
        const body = { reward_id: id };

        const { reward }: { reward: Reward } = await fetchData(path, method, body);

        deleteReward(reward.rewardId);
        deleteItemRequirements('reward', reward.rewardId);
    }

    const addOrDeleteRequirement = async () => {
        setSelectedRewardId(id);
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

        setCompleted(setCompletedData);
    }

    return (
        <div className={`reward ${!completed ? 'locked': ''}`} data-testid={`reward-${id}`}>
            <form className='reward-form' id={`reward-form-${id}`} onBlur={editReward} onSubmit={editReward} >
                <input className='reward-form-textfield' defaultValue={text} name='text' onChange={handleTextChange} />
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

const mapStateToProps = createStructuredSelector({
    rewardRequirements: getRewardRequirements,
    selectedRewardId: getSelectedRewardId
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    deleteItemRequirements: (itemType: 'reward', itemId: number) => dispatch(deleteItemRequirements(itemType, itemId)),
    deleteReward: (rewardId: number) => dispatch(deleteReward(rewardId)),
    editRewardText: (reward: Reward) => dispatch(editRewardText(reward)),
    setCompleted: (data: SetCompletedData) => dispatch(setCompleted(data)),
    setSelectedRewardId: (rewardId: number | null) => dispatch(setSelectedRewardId(rewardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardItem);