import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './user-page.styles.scss';

import { ReduxState } from '../../redux/root-reducer';

import TodoItem from '../../components/todo-item/todo-item.component';
import AddItem from '../../components/add-item/add-item.component';
import RewardItem from '../../components/reward-item/reward-item.component';

import { getTodos } from '../../redux/selectors/todos.selectors'
import { todoAdded } from '../../redux/slices/todosSlice';
import { getRewards, getSelectedRewardId } from '../../redux/selectors/rewards.selectors'
import { rewardAdded, selectedRewardIdSet } from '../../redux/slices/rewardsSlice';
import { getSelectedRewardRequirements } from '../../redux/selectors/requirements.selectors';

const UserPage: React.FC = () => {
    const todos = useSelector((state: ReduxState) => getTodos(state));
    const rewards = useSelector((state: ReduxState) => getRewards(state));
    const selectedRewardId = useSelector((state: ReduxState) => getSelectedRewardId(state));
    const selectedRewardRequirements = useSelector((state: ReduxState) => getSelectedRewardRequirements(state));

    const dispatch = useDispatch();

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
        dispatch(selectedRewardIdSet(null));
    }

    return (
        <div className='user-page' data-testid='user-page'>
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
                <AddItem addItemToRedux={todo => dispatch(todoAdded(todo))} type='todo' />
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
                <AddItem addItemToRedux={reward => dispatch(rewardAdded(reward))} type='reward' />
            </section>
        </div>
    );
}

export default UserPage;