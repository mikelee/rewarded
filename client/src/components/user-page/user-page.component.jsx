import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './user-page.styles.scss';

import TodoItem from '../todo-item/todo-item.component';
import AddItem from '../add-item/add-item.component';
import RewardItem from '../reward-item/reward-item.component';

import { getTodos } from '../../redux/todos/todos.selectors'
import { setTodos } from '../../redux/todos/todos.actions';
import { getRewards, getSelectedReward } from '../../redux/rewards/rewards.selectors'
import { setRewards, setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { getColorTheme } from '../../redux/user/user.selectors';
import { setColorTheme } from '../../redux/user/user.actions';

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.selectionTitle = React.createRef();
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

    fetchTodos = () => {
        if (this.props.currentUser) {
            fetch('/api/todo/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => this.props.setTodos(json));
        }
    }

    fetchRewards = () => {
        if (this.props.currentUser) {
            fetch('/api/reward/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => {
                this.props.setRewards(json);
                this.assignUnlock(json);
            });
        }
    }

    fetchRequirements = () => {
        const data = {
            userId: this.props.currentUser.user_id
        }

        fetch('/api/requirement/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            this.props.setRequirements(json);
            this.assignUnlock();
        });
    }

    fetchTodosForSelection = () => {
        const data = {
            reward_id: this.props.selectedReward,
            user_id: this.props.currentUser.user_id
        }

        fetch('/api/get-requirements-and-todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => this.props.setTodos(json));
    }

    scrollToSelection = () => {
        this.selectionTitle.current.scrollIntoView({behavior: 'smooth'});
    }

    exitSelection = () => {
        this.props.setSelectedReward(null);
        this.fetchTodos();
    }

    render() {
        const { todos, rewards, selectedReward } = this.props;

        return (
            <div className='user-page'>
                {selectedReward
                    ? <h2 className='title' ref={this.selectionTitle}>Select Reward Requirements</h2>
                    : <h2 className='title'>To Do</h2>
                }
                {this.props.selectedReward !== null ? <button className='exit-button' onClick={this.exitSelection}>Done</button> : null}
                {todos ? todos.map(todo => <TodoItem fetchTodos={this.fetchTodos} fetchRequirements={this.fetchRequirements} fetchTodosForSelection={this.fetchTodosForSelection} key={todo.todo_id} id={todo.todo_id} text={todo.text} completed={todo.completed} selectedReward={this.props.selectedReward} associatedReward={todo.reward_id} />) : null}
                <AddItem fetchTodos={this.fetchTodos} type='todo' currentUser={this.props.currentUser} />

                <h3 className='title'>Rewards</h3>
                {rewards ? rewards.map(reward => <RewardItem fetchRewards={this.fetchRewards} fetchRequirements={this.fetchRequirements} key={reward.reward_id} id={reward.reward_id} text={reward.text} fetchTodosForSelection={this.fetchTodosForSelection} scroll={this.scrollToSelection}/>) : null}
                <AddItem fetchRewards={this.fetchRewards} type='reward' currentUser={this.props.currentUser} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    todos: getTodos,
    rewards: getRewards,
    selectedReward: getSelectedReward,
    requirements: getRequirements,
    colorTheme: getColorTheme
});

const mapDispatchToProps = dispatch => ({
    setTodos: todos => dispatch(setTodos(todos)),
    setRewards: rewards => dispatch(setRewards(rewards)),
    setSelectedReward: reward => dispatch(setSelectedReward(reward)),
    setIsUnlocked: requirements => dispatch(setIsUnlocked(requirements)),
    setRequirements: requirements => dispatch(setRequirements(requirements)),
    setColorTheme: color => dispatch(setColorTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);