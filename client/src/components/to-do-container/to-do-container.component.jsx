import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';
import AddItem from '../add-item/add-item.component';
import RewardItem from '../reward-item/reward-item.component';

import { getToDos } from '../../redux/to-dos/to-dos.selectors'
import { setToDos } from '../../redux/to-dos/to-dos.actions';
import { getRewards, getSelectedReward } from '../../redux/rewards/rewards.selectors'
import { setRewards, setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';
import { setRequirements } from '../../redux/requirements/requirements.actions';

class ToDoContainer extends React.Component {

    componentDidMount() {
        this.fetchToDosRewardsAndRequirements();
        this.props.setSelectedReward(null);
    }

    assignUnlock = (rewards) => {
        if (rewards) {
            const { requirements } = this.props;

            rewards.forEach((reward) => {
                const isUnlocked = requirements.filter(requ => requ.reward_id === reward.reward_id).every((requirement) => requirement.completed === 1);
                const rewardId = reward.reward_id;

                const data = {
                    rewardId,
                    isUnlocked
                }
                this.props.setIsUnlocked(data);
            });
        } else {
            const { rewards, requirements } = this.props;

            rewards.forEach(reward => {
                const isUnlocked = requirements.filter(requirment => requirment.reward_id === reward.reward_id).every((requirement) => requirement.completed === 1);
                const rewardId = reward.reward_id;

                const data = {
                    rewardId,
                    isUnlocked
                }
                this.props.setIsUnlocked(data);
            });
        }
    }

    fetchToDosRewardsAndRequirements = () => {
        if (this.props.currentUser) {
            fetch('http://localhost:4444/api', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => {
                this.props.setToDos(json[0]);
                this.props.setRequirements(json[2]);
                this.props.setRewards(json[1])
                this.assignUnlock(json[1]);
            });
        }
    }

    fetchToDos = () => {
        if (this.props.currentUser) {
            fetch('http://localhost:4444/api/todo/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => this.props.setToDos(json));
        }
    }

    fetchRewards = () => {
        if (this.props.currentUser) {
            fetch('http://localhost:4444/api/reward/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => this.props.setRewards(json));
        }
    }

    fetchRequirements = () => {
        const data = {
            userId: this.props.currentUser.user_id
        }

        fetch('http://localhost:4444/api/requirement/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => this.props.setRequirements(json))
        .then(() => this.assignUnlock());
    }

    fetchToDosForSelection = () => {
        const data = {
            reward_id: this.props.selectedReward,
            owner_id: this.props.currentUser.user_id
        }

        fetch('http://localhost:4444/api/get-requirements-and-todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => this.props.setToDos(json));
    }

    exitSelection = () => {
        this.props.setSelectedReward(null);
        this.fetchToDos();
    }    

    render() {
        const { toDos, rewards, selectedReward } = this.props;

        return (
            <div className='to-do-container'>
                {selectedReward
                    ? <h2 className='title'>Select Reward Requirements</h2>
                    : <h2 className='title'>To Do</h2>
                }
                {this.props.selectedReward !== null ? <button onClick={this.exitSelection}>Exit Selection</button> : null}
                {toDos ? toDos.map(toDo => <ToDoItem fetchToDos={this.fetchToDos} fetchRequirements={this.fetchRequirements} fetchToDosForSelection={this.fetchToDosForSelection} key={toDo.to_do_id} id={toDo.to_do_id} text={toDo.text} completed={toDo.completed} selectedReward={this.props.selectedReward} associatedReward={toDo.reward_id} />) : null}
                <AddItem fetchToDos={this.fetchToDos} type='todo' currentUser={this.props.currentUser} />

                <h3 className='title'>Rewards</h3>
                {rewards ? rewards.map(reward => <RewardItem fetchRewards={this.fetchRewards} fetchRequirements={this.fetchRequirements} key={reward.reward_id} id={reward.reward_id} text={reward.text} fetchToDosForSelection={this.fetchToDosForSelection} />) : null}
                <AddItem fetchRewards={this.fetchRewards} type='reward' currentUser={this.props.currentUser} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    toDos: getToDos,
    rewards: getRewards,
    selectedReward: getSelectedReward,
    requirements: getRequirements
});

const mapDispatchToProps = dispatch => ({
    setToDos: toDos => dispatch(setToDos(toDos)),
    setRewards: rewards => dispatch(setRewards(rewards)),
    setSelectedReward: reward => dispatch(setSelectedReward(reward)),
    setIsUnlocked: requirements => dispatch(setIsUnlocked(requirements)),
    setRequirements: requirements => dispatch(setRequirements(requirements))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);