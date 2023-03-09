import React from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../../utils';

import './todo-item.styles.scss';

import { Dispatch } from 'redux';
import { Action, Requirement, Todo } from '../../../types';

import ToggleButton from '../toggle-button/toggle-button.component';
import { Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { deleteTodo, editTodoCompleted, editTodoText } from '../../redux/todos/todos.actions';
import { addRequirement, deleteItemRequirements, deleteRequirement, editRequirementCompleted, editRequirementText } from '../../redux/requirements/requirements.actions';

interface OwnProps {
    id: number,
    text: string,
    completed: number,
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

interface State {
    text: string,
    swipeStart: number | undefined,
    swipeEnd: number | undefined,
    swipeChange: number | undefined
}

class TodoItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: this.props.text,
            swipeStart: undefined,
            swipeEnd: undefined,
            swipeChange: undefined
        }
    }

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    handleSwipeStart = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;

        this.setState({swipeStart: x})
    }
    
    handleSwipeEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;
        let changeX;

        if (this.state.swipeStart) {
            changeX = x - this.state.swipeStart;
        }

        this.setState({swipeEnd: x});

        if (this.state.swipeStart && changeX) {
            if (changeX <= -75 || 75 <= changeX) {
                this.deleteTodo();
            } else {
                this.setState({swipeChange: 0});
            }
        }
    }

    handleSwipeMove = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;
        let start: number | undefined = this.state.swipeStart;

        if (start) {
            this.setState({swipeChange: x - start});
        }
    }

    updateTodo = async (event: React.FocusEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const path = '/api/todo/update';
        const method = 'PUT';
        const body = {
            todo_id: this.props.id,
            text: this.state.text
        };

        const updatedTodo: Todo = await fetchData(path, method, body);

        this.props.editTodoText(updatedTodo);
        this.props.editRequirementText(updatedTodo);
    }

    deleteTodo = async (event: React.FormEvent<HTMLFormElement> | undefined = undefined) => {
        if (event) event.preventDefault();

        const path = '/api/todo/delete';
        const method = 'DELETE';
        const body = { todo_id: this.props.id };

        const { todo }: { todo: Todo } = await fetchData(path, method, body);

        this.props.deleteTodo(todo.todoId);
        this.props.deleteItemRequirements('todo', todo.todoId);
    }

    toggleTodoCompleted = async () => {
        const path = '/api/todo/complete';
        const method = 'POST';
        const body = { todo_id: this.props.id };

        const updatedTodo = await fetchData(path, method, body);

        this.props.editTodoCompleted(updatedTodo);
        this.props.editRequirementCompleted(updatedTodo);
    }

    createOrDeleteRequirement = async () => {
        const { selected } = this.props;

        if (selected) {
            const path = '/api/requirement/delete';
            const method = 'DELETE';
            const body = {
                reward_id: this.props.selectedRewardId,
                todo_id: this.props.id
            };

            const deletedRequirement: Requirement = await fetchData(path, method, body);

            this.props.deleteRequirement(deletedRequirement.todoId, deletedRequirement.rewardId);
        } else {
            const path = '/api/requirement/create';
            const method = 'POST';
            const body = {
                reward_id: this.props.selectedRewardId,
                todo_id: this.props.id
            };

            const newRequirement: Requirement = await fetchData(path, method, body);

            /*
                Requirements in database only have todoId and rewardId.
                These lines "join" the todo's text, completed, and timestamp values with the requirement.
            */
            newRequirement.text = this.props.text;
            newRequirement.completed = this.props.completed;
            newRequirement.timestamp = this.props.timestamp;

            this.props.addRequirement(newRequirement);
        }
    }

    render() {
        const { id, text, completed, selectedRewardId, selected } = this.props;

        return (
            <div
                className='todo' 
                data-testid={`todo-${id}`}
                {...window.innerWidth <= 480 &&
                    {
                        onTouchStart: event => this.handleSwipeStart(event), 
                        onTouchEnd: event => this.handleSwipeEnd(event), 
                        onTouchMove: event => this.handleSwipeMove(event)
                    }
                } 
                style={{transform: `translateX(${this.state.swipeChange}px)`}}
            >
                {!selectedRewardId
                ? <ToggleButton completed={completed} selected={selected} onClick={this.toggleTodoCompleted} />
                : <ToggleButton completed={completed} selected={selected} onClick={this.createOrDeleteRequirement} />
                }
                <form className='todo-edit-form' id={`todo-edit-form-${id}`} onBlur={this.updateTodo} onSubmit={this.updateTodo} >
                    <input name='text' className={`todo-edit-form-textfield ${completed ? 'text-completed': ''}`} onChange={this.handleTextChange} placeholder='I want to...' defaultValue={text}/>
                </form>
                {!selectedRewardId
                ?
                    <form className='todo-delete-form' onSubmit={this.deleteTodo}>
                        <IconButton className='todo-icon-button' type='submit'>
                            <Clear className='todo-clear-icon' fontSize='large'/>
                        </IconButton>
                    </form>
                : null
                }
            </div>
        );
    }
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