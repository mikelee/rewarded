import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reward-item.styles.scss';

import Requirement from '../requirement/requirement.component';
import { Button, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
        event.preventDefault();
        const data = {
            id: this.props.id,
            text: this.state.text
        }

        fetch('http://localhost:4444/api/reward/update', {
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

        fetch('http://localhost:4444/api/reward/delete', {
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
        .then(() => this.props.props.fetchRequirements())
        .then(() => {
            const isUnlocked = this.props.requirements.every(requirement => requirement.completed === 1);
            
            let data = {
                rewardId: this.props.id,
                isUnlocked
            }

            this.props.setIsUnlocked(data);
        });
    }

    addOrDeleteRequirement = async () => {
        await this.props.setSelectedReward(this.props.id);

        await this.props.fetchToDosForSelection();

        const isUnlocked = this.props.requirements.every((el) => el.completed === 1);
            
        let data = {
            rewardId: this.props.id,
            isUnlocked
        }

        this.props.setIsUnlocked(data);
    }

    deleteRequirement = id => {
        return event => {
            event.preventDefault();

            const data = {
                reward_id: this.props.id,
                to_do_id: id
            }

            fetch('http://localhost:4444/api/requirement/delete', {
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
            <div className='reward-item'>
                
                <div className='reward'>
                    <form id={`reward-form-${id}`} onSubmit={this.editReward} >
                        <TextField id='standard-basic' defaultValue={text} name='text' onChange={this.handleTextChange}></TextField>
                    </form>
                    <h3>
                        {isUnlocked
                            ? 'unlocked'
                            : 'locked'
                        }
                    </h3>
                </div>
                <div className='to-complete'>
                    <h3 className='requirements-title'>Requirements</h3>
                    {requirements !== null ? requirements.filter(requirement => requirement.reward_id === id).map(requirement => (
                        <Requirement key={requirement.to_do_id} deleteRequirement={this.deleteRequirement} reward_id={id} {...requirement}/>
                    ))
                    : null }
                    <IconButton className='add-requirement-button' onClick={this.addOrDeleteRequirement}>
                        <AddIcon className='add-requirement-icon' fontSize='large'/>
                    </IconButton>
                </div>
                <div className='buttons'>
                    <Button form={`reward-form-${id}`} type='submit' variant='outlined'>Edit</Button>
                    <form onSubmit={this.deleteReward}>
                        <Button type='submit' variant='contained' color='secondary'>Delete</Button>
                    </form>
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