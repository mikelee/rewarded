import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reward-item.styles.scss';

import Requirement from '../requirement/requirement.component';
import { IconButton } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

import { getRewards, getIsUnlocked } from '../../redux/rewards/rewards.selectors';
import { setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';

class RewardItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    componentDidMount() {
        this.props.fetchRequirements();
    }

    handleTextChange = event => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    editReward = event => {
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
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchRewards());
    }

    deleteReward = event => {
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
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchRewards())
        .then(() => this.props.fetchRequirements())
    }

    addOrDeleteRequirement = async () => {
        await this.props.setSelectedReward(this.props.id);
        await this.props.fetchToDosForSelection();
        this.props.scroll();
    }

    deleteRequirement = id => {
        return event => {
            event.preventDefault();

            const data = {
                reward_id: this.props.id,
                to_do_id: id
            }

            fetch('/api/requirement/delete', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(data)
            })
            .then(() => this.props.fetchRequirements());
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
                            <Requirement key={requirement.to_do_id} deleteRequirement={this.deleteRequirement} reward_id={id} {...requirement}/>
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

const mapStateToProps = createStructuredSelector({
    isUnlocked: getIsUnlocked,
    rewards: getRewards,
    requirements: getRequirements
});

const mapDispatchToProps = dispatch => ({
    setIsUnlocked: isUnlocked => dispatch(setIsUnlocked(isUnlocked)),
    setSelectedReward: reward => dispatch(setSelectedReward(reward))
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardItem);