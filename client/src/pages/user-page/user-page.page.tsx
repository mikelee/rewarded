import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './user-page.styles.scss';

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

type Props = StateProps & DispatchProps;

const UserPage: React.FC<Props> = ({ todos, rewards, selectedRewardId, selectedRewardRequirements, addTodo, addReward, setSelectedRewardId }) => {
    const selectionTitleRef = useRef<HTMLHeadingElement | null>(null);
    
    useEffect(() => {
        if (selectedRewardId !== null) {
            scrollToSelection();
        }
    }, [selectedRewardId]);

    const scrollToSelection = () => {
        selectionTitleRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    const exitSelection = () => {
        setSelectedRewardId(null);
    }

    return (
        <div className='user-page'>
            <section className='todos-section'>
                {selectedRewardId
                    ? <h2 className='title' ref={selectionTitleRef}>Select Reward Requirements</h2>
                    : <h2 className='title'>To Do</h2>
                }
                {selectedRewardId !== null ? <button className='exit-button' onClick={exitSelection}>Done</button> : null}
                <div className='list'>
                    {todos.map(todo =>
                        <TodoItem
                            key={todo.todoId}
                            id={todo.todoId}
                            text={todo.text}
                            completed={todo.completed}
                            timestamp={todo.timestamp}
                            selectedRewardId={selectedRewardId}
                            selected={selectedRewardRequirements?.has(todo.todoId)}
                        />)
                    }
                </div>
                <AddItem addItemToRedux={addTodo} type='todo' />
            </section>
            <section className='rewards-section'>
                <h3 className='title'>Rewards</h3>
                <div className='list'>
                    {rewards.map(reward =>
                        <RewardItem
                            key={reward.rewardId} id={reward.rewardId}
                            text={reward.text}
                            completed={reward.completed}
                        />)
                    }
                </div>
                <AddItem addItemToRedux={addReward} type='reward' />
            </section>
        </div>
    );
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