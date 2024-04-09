import React, { useState } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../../utils';

import './todo-item.styles.scss';

import { Dispatch } from 'redux';
import { Action, Requirement, Todo } from '../../../types';

import ToggleButton from '../toggle-button/toggle-button.component';
import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { deleteTodo, editTodoCompleted, editTodoText } from '../../redux/todos/todos.actions';
import { addRequirement, deleteItemRequirements, deleteRequirement, editRequirementCompleted, editRequirementText } from '../../redux/requirements/requirements.actions';

interface OwnProps {
    id: number,
    text: string,
    completed: boolean,
    selectedRewardId: number | null,
    selected: boolean
    timestamp: string,
}

interface DispatchProps {
    deleteTodo: (todoId:  number) => void,
    editTodoCompleted: (todo: Todo) => void,
    editTodoText: (todo: Todo) => void,
    addRequirement: (requirement: Requirement) => void,
    deleteItemRequirements: (itemType: 'todo', itemId: number) => void,
    deleteRequirement: (todoId: number, rewardId: number) => void,
    editRequirementCompleted: (todo: Todo) => void
    editRequirementText: (todo: Todo) => void
}

type Props = OwnProps & DispatchProps;

const TodoItem: React.FC<Props> = ({ id, text, completed, selectedRewardId, selected, timestamp, deleteTodo, editTodoCompleted, editTodoText, addRequirement, deleteItemRequirements, deleteRequirement, editRequirementCompleted, editRequirementText }) => {

    const [itemText, setItemText] = useState(text);
    const [swipeStart, setSwipeStart] = useState<number | undefined>();
    const [swipeEnd, setSwipeEnd] = useState<number | undefined>();
    const [swipeChange, setSwipeChange] = useState<number | undefined>();

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        setItemText(value);
    }

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

        setSwipeEnd(x);

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

        const path = '/api/todo/update';
        const method = 'PUT';
        const body = {
            todo_id: id,
            text: itemText
        };

        const updatedTodo: Todo = await fetchData(path, method, body);

        editTodoText(updatedTodo);
        editRequirementText(updatedTodo);
    }

    const handleDelete = async (event: React.FormEvent<HTMLFormElement> | undefined = undefined) => {
        if (event) event.preventDefault();

        const path = '/api/todo/delete';
        const method = 'DELETE';
        const body = { todo_id: id };

        const { todo }: { todo: Todo } = await fetchData(path, method, body);

        deleteTodo(todo.todoId);
        deleteItemRequirements('todo', todo.todoId);
    }

    const toggleTodoCompleted = async () => {
        const path = '/api/todo/complete';
        const method = 'POST';
        const body = { todo_id: id };

        const updatedTodo = await fetchData(path, method, body);

        editTodoCompleted(updatedTodo);
        editRequirementCompleted(updatedTodo);
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

            deleteRequirement(deletedRequirement.todoId, deletedRequirement.rewardId);
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

            addRequirement(newRequirement);
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
                <input aria-label='todo-text' name='text' className={`todo-edit-form-textfield ${completed ? 'text-completed': ''}`} onChange={handleTextChange} placeholder='I want to...' defaultValue={text}/>
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    deleteTodo: (todoId: number) => dispatch(deleteTodo(todoId)),
    editTodoCompleted: (todo: Todo) => dispatch(editTodoCompleted(todo)),
    editTodoText: (todo: Todo) => dispatch(editTodoText(todo)),
    addRequirement: (requirement: Requirement) => dispatch(addRequirement(requirement)),
    deleteItemRequirements: (itemType: 'todo', itemId: number) => dispatch(deleteItemRequirements(itemType, itemId)),
    deleteRequirement: (todoId: number, rewardId: number) => dispatch(deleteRequirement(todoId, rewardId)),
    editRequirementCompleted: (todo: Todo) => dispatch(editRequirementCompleted(todo)),
    editRequirementText: (todo: Todo) => dispatch(editRequirementText(todo))
});

export default connect(null, mapDispatchToProps)(TodoItem);