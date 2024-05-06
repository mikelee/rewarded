import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { fetchData } from '../../utils';

import './todo-item.styles.scss';

import { Requirement, Todo } from '../../../types';

import ToggleButton from '../toggle-button/toggle-button.component';
import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { todoCompletedToggled, todoDeleted, todoTextEdited } from '../../redux/todos/todosSlice';
import { itemRequirementsDeleted, requirementAdded, requirementCompletedToggled, requirementDeleted, requirementTextEdited } from '../../redux/requirements/requirementsSlice';

interface Props {
    id: number,
    text: string,
    completed: boolean,
    selectedRewardId: number | null,
    selected: boolean
    timestamp: string,
}

const TodoItem: React.FC<Props> = ({ id, text, completed, selectedRewardId, selected, timestamp }) => {
    const [swipeStart, setSwipeStart] = useState<number | undefined>();
    const [swipeChange, setSwipeChange] = useState<number | undefined>();

    const dispatch = useDispatch();

    const handleSwipeStart = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;

        setSwipeStart(x);
    }
    
    const handleSwipeEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;
        let changeX;

        if (swipeStart) {
            changeX = x - swipeStart;
        }

        if (swipeStart && changeX) {
            if (changeX <= -75 || 75 <= changeX) {
                handleDelete();
            } else {
                setSwipeChange(0);
            }
        }
    }

    const handleSwipeMove = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;

        if (swipeStart) {
            setSwipeChange(x - swipeStart);
        }
    }

    const updateTodo = async (event: React.FocusEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const changedText = (event.target as HTMLInputElement).value;

        const path = '/api/todo/update';
        const method = 'PUT';
        const body = {
            todo_id: id,
            text: changedText
        };

        const updatedTodo: Todo = await fetchData(path, method, body);

        dispatch(todoTextEdited(updatedTodo));
        dispatch(requirementTextEdited(updatedTodo));
    }

    const handleDelete = async (event: React.FormEvent<HTMLFormElement> | undefined = undefined) => {
        if (event) event.preventDefault();

        const path = '/api/todo/delete';
        const method = 'DELETE';
        const body = { todo_id: id };

        const { todo }: { todo: Todo } = await fetchData(path, method, body);

        dispatch(todoDeleted(todo.todoId));
        dispatch(itemRequirementsDeleted({ itemType: 'todo', itemId: todo.todoId }));
    }

    const toggleTodoCompleted = async () => {
        const path = '/api/todo/complete';
        const method = 'POST';
        const body = { todo_id: id };

        const updatedTodo = await fetchData(path, method, body);

        dispatch(todoCompletedToggled(updatedTodo));
        dispatch(requirementCompletedToggled(updatedTodo));
    }

    const createOrDeleteRequirement = async () => {
        if (selected) {
            const path = '/api/requirement/delete';
            const method = 'DELETE';
            const body = {
                reward_id: selectedRewardId,
                todo_id: id
            };

            const deletedRequirement: Requirement = await fetchData(path, method, body);

            dispatch(requirementDeleted({ todoId: deletedRequirement.todoId, rewardId: deletedRequirement.rewardId }));
        } else {
            const path = '/api/requirement/create';
            const method = 'POST';
            const body = {
                reward_id: selectedRewardId,
                todo_id: id
            };

            const newRequirement: Requirement = await fetchData(path, method, body);

            /*
                Requirements in database only have todoId and rewardId.
                These lines "join" the todo's text, completed, and timestamp values with the requirement.
            */
            newRequirement.text = text;
            newRequirement.completed = completed;
            newRequirement.timestamp = timestamp;

            dispatch(requirementAdded(newRequirement));
        }
    }

    return (
        <div
            className='todo' 
            data-testid={`todo-${id}`}
            {...window.innerWidth <= 480 &&
                {
                    onTouchStart: event => handleSwipeStart(event), 
                    onTouchEnd: event => handleSwipeEnd(event), 
                    onTouchMove: event => handleSwipeMove(event)
                }
            } 
            style={{transform: `translateX(${swipeChange}px)`}}
        >
            {!selectedRewardId
            ? <ToggleButton completed={completed} selected={selected} onClick={toggleTodoCompleted} />
            : <ToggleButton completed={completed} selected={selected} onClick={createOrDeleteRequirement} />
            }
            <form className='todo-edit-form' id={`todo-edit-form-${id}`} test-id={`todo-edit-form-${id}`} onBlur={updateTodo} onSubmit={updateTodo} >
                <input aria-label='todo-text' name='text' className={`todo-edit-form-textfield ${completed ? 'text-completed': ''}`} placeholder='I want to...' defaultValue={text}/>
            </form>
            {!selectedRewardId
            ?
                <form className='todo-delete-form' onSubmit={handleDelete}>
                    <IconButton className='todo-icon-button' type='submit'>
                        <Clear className='todo-clear-icon' fontSize='large'/>
                    </IconButton>
                </form>
            : null
            }
        </div>
    );
}

export default TodoItem;