import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './user-page.styles.scss';

import { User } from '../../../types';

import { Dispatch } from 'redux';
import { Todo, Reward, Requirement, SetIsUnlockedData, ReduxState, Action } from '../../../types';

import TodoItem from '../todo-item/todo-item.component';
import AddItem from '../add-item/add-item.component';
import RewardItem from '../reward-item/reward-item.component';

import { getTodos } from '../../redux/todos/todos.selectors'
import { setTodos } from '../../redux/todos/todos.actions';
import { getRewards, getSelectedRewardId } from '../../redux/rewards/rewards.selectors'
import { setRewards, setSelectedRewardId, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { getColorTheme } from '../../redux/user/user.selectors';
import { setColorTheme } from '../../redux/user/user.actions';

interface OwnProps {
    currentUser: User
}

interface StateProps {
    todos: Todo[] | null,
    rewards: Reward[] | null,
    selectedRewardId: number | null,
    requirements: Requirement[] | null,
    colorTheme: string | null
}

interface DispatchProps {
    setTodos: (todos: Todo[]) => void,
    setRewards: (rewards: Reward[]) => void,
    setSelectedRewardId: (rewardId: number | null) => void,
    setIsUnlocked: (data: SetIsUnlockedData) => void,
    setRequirements: (requirements: Requirement[]) => void,
    setColorTheme: (color: string) => void
}

type Props = OwnProps & StateProps & DispatchProps;

class UserPage extends React.Component<Props> {
    private selectionTitle: React.RefObject<HTMLHeadingElement>

    constructor(props: Props) {
        super(props);

        this.selectionTitle = React.createRef<HTMLHeadingElement>();
    }

    assignUnlock = (rewards: Reward[] | null) => {
        if (rewards) {
            const { requirements } = this.props;

            rewards.forEach((reward) => {
                const isUnlocked = requirements?.filter(requirement => requirement.rewardId === reward.rewardId).every(requirement => requirement.completed === 1);
                const rewardId = reward.rewardId;

                if (isUnlocked) {
                    const data = {
                        rewardId,
                        isUnlocked
                    }
                    this.props.setIsUnlocked(data);
                }
            });
        } else {
            const { rewards, requirements } = this.props;

            rewards?.forEach(reward => {
                const isUnlocked = requirements?.filter(requirment => requirment.rewardId === reward.rewardId).every((requirement) => requirement.completed === 1);
                const rewardId = reward.rewardId;

                if (isUnlocked !== undefined) {
                    const data = {
                        rewardId,
                        isUnlocked
                    }
                    this.props.setIsUnlocked(data);
                }
            });
        }
    }

    fetchTodos = async () => {
        if (this.props.currentUser) {
            const response = await fetch('/api/todo/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(this.props.currentUser)
            });

            const json = await response.json();

            this.props.setTodos(json);
        }
    }

    fetchRewards = async () => {
        if (this.props.currentUser) {
            const response = await fetch('/api/reward/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(this.props.currentUser)
            });

            const json = await response.json();

            this.props.setRewards(json);
            this.assignUnlock(json);
        }
    }

    fetchRequirements = async () => {
        const data = {
            userId: this.props.currentUser.userId
        }

        const response = await fetch('/api/requirement/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        this.props.setRequirements(json);
        this.assignUnlock(null);
    }

    fetchTodosForSelection = async () => {
        const data = {
            rewardId: this.props.selectedRewardId,
            userId: this.props.currentUser.userId
        }

        const response = await fetch('/api/get-requirements-and-todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        this.props.setTodos(json);
    }

    scrollToSelection = () => {
        this.selectionTitle.current?.scrollIntoView({behavior: 'smooth'});
    }

    exitSelection = () => {
        this.props.setSelectedRewardId(null);
        this.fetchTodos();
    }

    render() {
        const { todos, rewards, selectedRewardId } = this.props;

        return (
            <div className='user-page'>
                {selectedRewardId
                    ? <h2 className='title' ref={this.selectionTitle}>Select Reward Requirements</h2>
                    : <h2 className='title'>To Do</h2>
                }
                {this.props.selectedRewardId !== null ? <button className='exit-button' onClick={this.exitSelection}>Done</button> : null}
                {todos ? todos.map(todo => <TodoItem fetchTodos={this.fetchTodos} fetchRequirements={this.fetchRequirements} fetchTodosForSelection={this.fetchTodosForSelection} key={todo.todoId} id={todo.todoId} text={todo.text} completed={todo.completed} selectedRewardId={this.props.selectedRewardId} associatedReward={todo.rewardId} />) : null}
                <AddItem fetchTodos={this.fetchTodos} type='todo' currentUser={this.props.currentUser} />

                <h3 className='title'>Rewards</h3>
                {rewards ? rewards.map(reward => <RewardItem fetchRewards={this.fetchRewards} fetchRequirements={this.fetchRequirements} key={reward.rewardId} id={reward.rewardId} text={reward.text} fetchTodosForSelection={this.fetchTodosForSelection} scroll={this.scrollToSelection} />) : null}
                <AddItem fetchRewards={this.fetchRewards} type='reward' currentUser={this.props.currentUser} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector<ReduxState, { todos: Todo[] | null, rewards: Reward[] | null, selectedRewardId: number | null, requirements: Requirement[] | null, colorTheme: string |null }>({
    todos: getTodos,
    rewards: getRewards,
    selectedRewardId: getSelectedRewardId,
    requirements: getRequirements,
    colorTheme: getColorTheme
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setTodos: (todos: Todo[]) => dispatch(setTodos(todos)),
    setRewards: (rewards: Reward[]) => dispatch(setRewards(rewards)),
    setSelectedRewardId: (rewardId: number | null) => dispatch(setSelectedRewardId(rewardId)),
    setIsUnlocked: (data: SetIsUnlockedData) => dispatch(setIsUnlocked(data)),
    setRequirements: (requirements: Requirement[]) => dispatch(setRequirements(requirements)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);