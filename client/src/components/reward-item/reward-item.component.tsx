import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reward-item.styles.scss';

import { Dispatch } from 'redux';
import { ReduxState, Reward, Requirement as RequirementInterface, Action, SetIsUnlockedData } from '../../../types';

import Requirement from '../requirement/requirement.component';
import { IconButton } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

import { getRewards, getIsUnlocked, getSelectedReward } from '../../redux/rewards/rewards.selectors';
import { setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';

interface RewardItemProps extends StateProps, DispatchProps {
    id: number,
    text: string,
    fetchRewards: () => void,
    fetchRequirements: () => void,
    fetchTodosForSelection: () => void,
    scroll: () => void,
}

interface RewardItemState {
    text: string
}

interface StateProps {
    isUnlocked: boolean | undefined,
    rewards: Reward[] | null,
    requirements: RequirementInterface[] | null,
    selectedReward: Reward | null
}

interface DispatchProps {
    setIsUnlocked: (isUnlocked: SetIsUnlockedData) => void,
    setSelectedReward: (rewardId: number) => void
}

class RewardItem extends React.Component<RewardItemProps, RewardItemState> {
    constructor(props: RewardItemProps) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    componentDidMount() {
        this.props.fetchRequirements();
    }

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    editReward = (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const data = {
            id: this.props.id,
            text: this.state.text
        }

        fetch('/api/reward/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchRewards());
    }

    deleteReward = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            id: this.props.id
        }

        fetch('/api/reward/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchRewards();
            this.props.fetchRequirements();
        });
    }

    addOrDeleteRequirement = async () => {
        await this.props.setSelectedReward(this.props.id);
        await this.props.fetchTodosForSelection();
        this.props.scroll();
    }

    deleteRequirement = (id: number) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const data = {
                reward_id: this.props.id,
                todo_id: id
            }

            fetch('/api/requirement/delete', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : 'true'
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                this.props.fetchRequirements();
                
                if (this.props.selectedReward) {
                    this.props.fetchTodosForSelection();
                }
            });
        }
    }

    render() {
        const { id, text, requirements, isUnlocked } = this.props;

        return (
            <div className={`reward ${isUnlocked ? 'unlocked': ''}`}>
                <form className='reward-form' id={`reward-form-${id}`} onBlur={this.editReward} onSubmit={this.editReward} >
                    <input className='reward-form-textfield' defaultValue={text} name='text' onChange={this.handleTextChange} />
                </form>
                <div className='reward-right-side'>
                    <div className='reward-to-complete'>
                        <h3 className='requirements-title'>Requirements</h3>
                        {requirements !== null
                        ? requirements.filter(requirement => requirement.reward_id === id).map(requirement => (
                            <Requirement key={requirement.todo_id} deleteRequirement={this.deleteRequirement} {...requirement}/>
                        ))
                        : null }
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

const mapStateToProps = createStructuredSelector<ReduxState, RewardItemProps, { isUnlocked: boolean | undefined, rewards: Reward[] | null, requirements: RequirementInterface[] | null, selectedReward: Reward | null }>({
    isUnlocked: getIsUnlocked,
    rewards: getRewards,
    requirements: getRequirements,
    selectedReward: getSelectedReward
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setIsUnlocked: (isUnlocked: SetIsUnlockedData) => dispatch(setIsUnlocked(isUnlocked)),
    setSelectedReward: (rewardId: number) => dispatch(setSelectedReward(rewardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardItem);