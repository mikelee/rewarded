import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';

import './reward-item.styles.scss';

import { Dispatch } from 'redux';
import { Reward, Requirement, Action, SetIsUnlockedData } from '../../../types';

import RequirementItem from '../requirement-item/requirement-item.component';
import { IconButton } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

import { getRewards, getIsUnlocked, getSelectedRewardId } from '../../redux/rewards/rewards.selectors';
import { setSelectedRewardId, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';

export interface OwnProps {
    id: number,
    text: string,
    fetchRewards: () => void,
    fetchRequirements: () => void
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

    componentDidMount() {
        if (this.props.requirements) {
            this.assignUnlock(this.props.requirements, this.props.setIsUnlocked);
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.requirements && this.props.requirements !== prevProps.requirements) {
            this.assignUnlock(this.props.requirements, this.props.setIsUnlocked);
        }
    }

    assignUnlock = (requirements: Requirement[], setIsUnlocked: ((data: SetIsUnlockedData) => void)) => {
        const isUnlocked = requirements.filter(requirement => requirement.rewardId === this.props.id).every(requirement => requirement.completed);
        const rewardId = this.props.id;

        const data = {
            rewardId,
            isUnlocked
        }
        
        setIsUnlocked(data);
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

        await fetchData(path, method, body);

        this.props.fetchRewards();
    }

    deleteReward = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const path = '/api/reward/delete';
        const method = 'DELETE';
        const body = { reward_id: this.props.id };

        await fetchData(path, method, body);

        this.props.fetchRewards();
        this.props.fetchRequirements();
    }

    addOrDeleteRequirement = async () => {
        this.props.setSelectedRewardId(this.props.id);
    }

    render() {
        const { id, text, requirements, isUnlocked } = this.props;

        return (
            <div className={`reward ${isUnlocked ? '' : 'locked'}`} data-testid={`reward-${id}`}>
                <form className='reward-form' id={`reward-form-${id}`} onBlur={this.editReward} onSubmit={this.editReward} >
                    <input className='reward-form-textfield' defaultValue={text} name='text' onChange={this.handleTextChange} />
                </form>
                <div className='reward-right-side'>
                    <div className='reward-to-complete'>
                        <h3 className='requirements-title'>Requirements</h3>
                        <div className='requirements-list'>
                            {requirements !== null
                            ? requirements?.filter(requirement => requirement.rewardId === id).map(requirement => (
                                <RequirementItem key={requirement.todoId} fetchRequirements={this.props.fetchRequirements} {...requirement}/>
                            ))
                            : null }
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