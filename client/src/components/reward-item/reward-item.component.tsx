import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';
import equal from 'fast-deep-equal';

import './reward-item.styles.scss';

import { Dispatch } from 'redux';
import { Action, Requirement, Reward } from '../../../types';

import RequirementItem from '../requirement-item/requirement-item.component';
import { IconButton } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

import { getSelectedRewardId } from '../../redux/rewards/rewards.selectors';
import { deleteReward, editRewardText, setSelectedRewardId } from '../../redux/rewards/rewards.actions';
import { getRewardRequirements } from '../../redux/requirements/requirements.selectors';
import { deleteItemRequirements } from '../../redux/requirements/requirements.actions';

export interface OwnProps {
    id: number,
    text: string
}

interface StateProps {
    rewardRequirements: Requirement[] | undefined,
    selectedRewardId: number | null
}

interface DispatchProps {
    deleteItemRequirements: (itemType: 'todo' | 'reward', itemId: number) => void,
    deleteReward: (rewardId: number) => void,
    editRewardText: (reward: Reward) => void,
    setSelectedRewardId: (rewardId: number | null) => void
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
    text: string,
    isUnlocked: boolean
}

class RewardItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: this.props.text,
            isUnlocked: false
        }
    }

    componentDidMount() {
        if (this.props.rewardRequirements) {
            this.assignUnlock(this.props.rewardRequirements);
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        const currentRequirements = this.props.rewardRequirements;
        const prevRequirements = prevProps.rewardRequirements;

        if (currentRequirements && !equal(currentRequirements, prevRequirements)) {
            this.assignUnlock(currentRequirements);
        }
    }

    assignUnlock = (requirements: Requirement[]) => {
        const isUnlocked = requirements.every(requirement => requirement.completed);
        
        this.setState({
            isUnlocked: isUnlocked
        });
    }

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    editReward = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const path = '/api/reward/update';
        const method = 'PUT';
        const body = {
            reward_id: this.props.id,
            text: this.state.text
        };

        const updatedReward = await fetchData(path, method, body);

        this.props.editRewardText(updatedReward);
    }

    deleteReward = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const path = '/api/reward/delete';
        const method = 'DELETE';
        const body = { reward_id: this.props.id };

        const { reward }: { reward: Reward } = await fetchData(path, method, body);

        this.props.deleteReward(reward.rewardId);
        this.props.deleteItemRequirements('reward', reward.rewardId);
    }

    addOrDeleteRequirement = async () => {
        this.props.setSelectedRewardId(this.props.id);
    }

    render() {
        const { id, text, rewardRequirements } = this.props;
        const { isUnlocked } = this.state;

        return (
            <div className={`reward ${isUnlocked ? '' : 'locked'}`} data-testid={`reward-${id}`}>
                <form className='reward-form' id={`reward-form-${id}`} onBlur={this.editReward} onSubmit={this.editReward} >
                    <input className='reward-form-textfield' defaultValue={text} name='text' onChange={this.handleTextChange} />
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
                        <IconButton className='requirement-add-button' onClick={this.addOrDeleteRequirement}>
                            <Add className='requirement-add-icon' fontSize='large'/>
                        </IconButton>
                        <form className='reward-delete-form' onSubmit={this.deleteReward}>
                            <IconButton className='reward-delete-form-button' type='submit'>
                                <Clear className='reward-clear-icon' fontSize='large' />
                            </IconButton>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    rewardRequirements: getRewardRequirements,
    selectedRewardId: getSelectedRewardId
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    deleteItemRequirements: (itemType: 'todo' | 'reward', itemId: number) => dispatch(deleteItemRequirements(itemType, itemId)),
    deleteReward: (rewardId: number) => dispatch(deleteReward(rewardId)),
    editRewardText: (reward: Reward) => dispatch(editRewardText(reward)),
    setSelectedRewardId: (rewardId: number | null) => dispatch(setSelectedRewardId(rewardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardItem);