import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reward-item.styles.scss';

import { Dispatch } from 'redux';
import { ReduxState, Reward, Requirement, Action, SetIsUnlockedData } from '../../../types';

import RequirementItem from '../requirement-item/requirement-item.component';
import { IconButton } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

import { getRewards, getIsUnlocked, getSelectedRewardId } from '../../redux/rewards/rewards.selectors';
import { setSelectedRewardId, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';

interface OwnProps {
    id: number,
    text: string,
    fetchRewards: () => void,
    fetchRequirements: () => void,
    fetchTodosForSelection: () => void,
    scroll: () => void,
}

interface StateProps {
    isUnlocked: boolean | undefined,
    rewards: Reward[] | null,
    requirements: Requirement[] | null,
    selectedRewardId: number | null
}

interface DispatchProps {
    setIsUnlocked: (isUnlocked: SetIsUnlockedData) => void,
    setSelectedRewardId: (rewardId: number | null) => void
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
    text: string
}

class RewardItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: this.props.text
        }
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
                'Access-Control-Allow-Credentials': 'true'
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
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchRewards();
            this.props.fetchRequirements();
        });
    }

    addOrDeleteRequirement = async () => {
        if (this.props.setSelectedRewardId) {
            await this.props.setSelectedRewardId(this.props.id);
            await this.props.fetchTodosForSelection();
            this.props.scroll();
        }
    }

    deleteRequirement = (todoId: number) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const data = {
                rewardId: this.props.id,
                todoId
            }

            fetch('/api/requirement/delete', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                this.props.fetchRequirements();
                
                if (this.props.selectedRewardId) {
                    this.props.fetchTodosForSelection();
                }
            });
        }
    }

    render() {
        const { id, text, requirements, isUnlocked } = this.props;

        return (
            <div className={`reward ${isUnlocked ? '' : 'locked'}`}>
                <form className='reward-form' id={`reward-form-${id}`} onBlur={this.editReward} onSubmit={this.editReward} >
                    <input className='reward-form-textfield' defaultValue={text} name='text' onChange={this.handleTextChange} />
                </form>
                <div className='reward-right-side'>
                    <div className='reward-to-complete'>
                        <h3 className='requirements-title'>Requirements</h3>
                        {requirements !== null
                        ? requirements?.filter(requirement => requirement.rewardId === id).map(requirement => (
                            <RequirementItem key={requirement.todoId} deleteRequirement={this.deleteRequirement} {...requirement}/>
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

const mapStateToProps = createStructuredSelector<ReduxState, OwnProps, { isUnlocked: boolean | undefined, rewards: Reward[] | null, requirements: Requirement[] | null, selectedRewardId: number | null }>({
    isUnlocked: getIsUnlocked,
    rewards: getRewards,
    requirements: getRequirements,
    selectedRewardId: getSelectedRewardId
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setIsUnlocked: (isUnlocked: SetIsUnlockedData) => dispatch(setIsUnlocked(isUnlocked)),
    setSelectedRewardId: (rewardId: number | null) => dispatch(setSelectedRewardId(rewardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardItem);