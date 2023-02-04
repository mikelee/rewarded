import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';

import './user-page.styles.scss';

import { User } from '../../../types';

import { Dispatch } from 'redux';
import { Todo, Reward, Requirement, SetIsUnlockedData, ReduxState, Action } from '../../../types';

import TodoItem from '../../components/todo-item/todo-item.component';
import AddItem from '../../components/add-item/add-item.component';
import RewardItem from '../../components/reward-item/reward-item.component';

import { getTodos } from '../../redux/todos/todos.selectors'
import { setTodos } from '../../redux/todos/todos.actions';
import { getRewards, getSelectedRewardId } from '../../redux/rewards/rewards.selectors'
import { setRewards, setSelectedRewardId, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { getColorTheme } from '../../redux/user/user.selectors';
import { setColorTheme } from '../../redux/user/user.actions';

interface OwnProps {
    currentUser: User,
    assignUnlock: (rewards: Reward[], requirements: Requirement[], setIsUnlocked: ((data: SetIsUnlockedData) => void)) => void
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

    componentDidMount() {
        if (this.props.selectedRewardId !== null) {
            this.fetchTodosForSelection();
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        // if there is a selected reward and it changed
        if (this.props.selectedRewardId !== null && prevProps.selectedRewardId !== this.props.selectedRewardId) {
            this.fetchTodosForSelection();
            this.scrollToSelection();
        }
        
        // if there is a selected reward and the requirements changed
        if (this.props.selectedRewardId !== null && prevProps.requirements !== this.props.requirements) {
            this.fetchTodosForSelection();
        }
    }

    fetchTodos = async () => {
        const todos = await fetchData('/api/todo', 'GET');

        this.props.setTodos(todos);
    }

    fetchRewards = async () => {
        const rewards = await fetchData('/api/reward', 'GET');

        this.props.setRewards(rewards);
        if (this.props.requirements) {
            this.props.assignUnlock(rewards, this.props.requirements, this.props.setIsUnlocked);
        }
    }

    fetchRequirements = async () => {
        const requirements = await fetchData('/api/requirement', 'GET');

        this.props.setRequirements(requirements);
        if (this.props.rewards && this.props.requirements) {
            this.props.assignUnlock(this.props.rewards, this.props.requirements, this.props.setIsUnlocked);
        }
    }

    fetchTodosForSelection = async () => {
        const rewardId = this.props.selectedRewardId!;

        const todosForSelection = await fetchData(`/api/todos-for-selection?reward_id=${rewardId}`, 'GET');

        this.props.setTodos(todosForSelection);
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
                <section className='todos-section'>
                    {selectedRewardId
                        ? <h2 className='title' ref={this.selectionTitle}>Select Reward Requirements</h2>
                        : <h2 className='title'>To Do</h2>
                    }
                    {this.props.selectedRewardId !== null ? <button className='exit-button' onClick={this.exitSelection}>Done</button> : null}
                    <div className='list'>
                        {todos ? todos.map(todo =>
                            <TodoItem
                                fetchTodos={this.fetchTodos}
                                fetchRequirements={this.fetchRequirements}
                                key={todo.todoId}
                                id={todo.todoId}
                                text={todo.text}
                                completed={todo.completed}
                                selectedRewardId={this.props.selectedRewardId}
                                associatedReward={todo.rewardId}
                            />)
                        : null}
                    </div>
                    <AddItem fetchItems={this.fetchTodos} type='todo' currentUser={this.props.currentUser} />
                </section>
                <section className='rewards-section'>
                    <h3 className='title'>Rewards</h3>
                    <div className='list'>
                        {rewards ? rewards.map(reward =>
                            <RewardItem
                                fetchRewards={this.fetchRewards}
                                fetchRequirements={this.fetchRequirements}
                                key={reward.rewardId} id={reward.rewardId}
                                text={reward.text}
                            />)
                        : null}
                    </div>
                    <AddItem fetchItems={this.fetchRewards} type='reward' currentUser={this.props.currentUser} />
                </section>
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