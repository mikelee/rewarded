import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';

import './user-page.styles.scss';

import { User } from '../../../types';

import { Dispatch } from 'redux';
import { Todo, Reward, Requirement, Action } from '../../../types';

import TodoItem from '../../components/todo-item/todo-item.component';
import AddItem from '../../components/add-item/add-item.component';
import RewardItem from '../../components/reward-item/reward-item.component';

import { getTodos } from '../../redux/todos/todos.selectors'
import { addTodo, setTodos } from '../../redux/todos/todos.actions';
import { getRewards, getSelectedRewardId } from '../../redux/rewards/rewards.selectors'
import { addReward, setRewards, setSelectedRewardId } from '../../redux/rewards/rewards.actions';
import { getRequirements, getSelectedRewardRequirements } from '../../redux/requirements/requirements.selectors';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { getColorTheme } from '../../redux/user/user.selectors';
import { setColorTheme } from '../../redux/user/user.actions';

interface OwnProps {
    currentUser: User
}

interface StateProps {
    todos: Todo[],
    rewards: Reward[],
    selectedRewardId: number | null,
    selectedRewardRequirements: Set<number>,
    requirements: Requirement[],
    colorTheme: string | null
}

interface DispatchProps {
    addTodo: (todo: Todo) => void,
    setTodos: (todos: Todo[]) => void,
    addReward: (reward: Reward) => void,
    setRewards: (rewards: Reward[]) => void,
    setSelectedRewardId: (rewardId: number | null) => void,
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

    componentDidUpdate(prevProps: Readonly<Props>) {
        // if there is a selected reward and it changed
        if (this.props.selectedRewardId !== null && prevProps.selectedRewardId !== this.props.selectedRewardId) {
            this.scrollToSelection();
        }
    }

    fetchTodos = async () => {
        const todos = await fetchData('/api/todo', 'GET');

        this.props.setTodos(todos);
    }

    fetchRewards = async () => {
        const rewards = await fetchData('/api/reward', 'GET');

        this.props.setRewards(rewards);
    }

    fetchRequirements = async () => {
        const requirements = await fetchData('/api/requirement', 'GET');

        this.props.setRequirements(requirements);
    }

    scrollToSelection = () => {
        this.selectionTitle.current?.scrollIntoView({behavior: 'smooth'});
    }

    exitSelection = () => {
        this.props.setSelectedRewardId(null);
    }

    render() {
        const { todos, rewards, selectedRewardId, addTodo, addReward } = this.props;

        return (
            <div className='user-page'>
                <section className='todos-section'>
                    {selectedRewardId
                        ? <h2 className='title' ref={this.selectionTitle}>Select Reward Requirements</h2>
                        : <h2 className='title'>To Do</h2>
                    }
                    {this.props.selectedRewardId !== null ? <button className='exit-button' onClick={this.exitSelection}>Done</button> : null}
                    <div className='list'>
                        {todos.map(todo =>
                            <TodoItem
                                fetchTodos={this.fetchTodos}
                                fetchRequirements={this.fetchRequirements}
                                key={todo.todoId}
                                id={todo.todoId}
                                text={todo.text}
                                completed={todo.completed}
                                selectedRewardId={this.props.selectedRewardId}
                                selected={this.props.selectedRewardRequirements?.has(todo.todoId)}
                            />)
                        }
                    </div>
                    <AddItem addItemToRedux={addTodo} type='todo' currentUser={this.props.currentUser} />
                </section>
                <section className='rewards-section'>
                    <h3 className='title'>Rewards</h3>
                    <div className='list'>
                        {rewards.map(reward =>
                            <RewardItem
                                fetchRewards={this.fetchRewards}
                                fetchRequirements={this.fetchRequirements}
                                key={reward.rewardId} id={reward.rewardId}
                                text={reward.text}
                            />)
                        }
                    </div>
                    <AddItem addItemToRedux={addReward} type='reward' currentUser={this.props.currentUser} />
                </section>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    todos: getTodos,
    rewards: getRewards,
    selectedRewardId: getSelectedRewardId,
    selectedRewardRequirements: getSelectedRewardRequirements,
    requirements: getRequirements,
    colorTheme: getColorTheme
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    addTodo: (todo: Todo) => dispatch(addTodo(todo)),
    setTodos: (todos: Todo[]) => dispatch(setTodos(todos)),
    addReward: (reward: Reward) => dispatch(addReward(reward)),
    setRewards: (rewards: Reward[]) => dispatch(setRewards(rewards)),
    setSelectedRewardId: (rewardId: number | null) => dispatch(setSelectedRewardId(rewardId)),
    setRequirements: (requirements: Requirement[]) => dispatch(setRequirements(requirements)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);