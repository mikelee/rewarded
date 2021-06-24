import React from 'react';

import './todo-item.styles.scss';

import ToggleButton from '../toggle-button/toggle-button.component';
import { Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface TodoItemProps {
    id: number,
    text: string,
    completed: number,
    selectedRewardId: number | null,
    associatedReward: number | undefined,
    fetchTodos: () => void,
    fetchRequirements: () => void,
    fetchTodosForSelection: () => void,
}

interface State {
    text: string
}

class TodoItem extends React.Component<TodoItemProps, State> {
    constructor(props: TodoItemProps) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    updateTodo = (event: React.FocusEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const data = {
            id: this.props.id,
            text: this.state.text
        }

        fetch('/api/todo/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchTodos();
            this.props.fetchRequirements();
        });
    }

    deleteTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            id: this.props.id
        }

        fetch('/api/todo/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchTodos();
            this.props.fetchRequirements();
        });
    }

    toggleTodoCompleted = () => {
        const data = {
            id: this.props.id
        }

        fetch('/api/todo/complete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchTodos();
            this.props.fetchRequirements();
        });
    }

    createOrDeleteRequirement = () => {
        let selected = this.props.selectedRewardId === this.props.associatedReward;
        
        const data = {
            todoId: this.props.id,
            rewardId: this.props.selectedRewardId,
            selected
        }
        
        fetch('/api/requirement/toggle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchTodosForSelection();
            this.props.fetchRequirements();
        });
    }

    render() {
        const { id, text, completed, selectedRewardId, associatedReward } = this.props;

        return (
            <div className='todo'>
                {!selectedRewardId
                ? <ToggleButton type='forTodo' completed={completed} toggleTodoCompleted={this.toggleTodoCompleted} />
                : <ToggleButton type='forRequirement' selectedRewardId={selectedRewardId} associatedReward={associatedReward} completed={completed} toggleRequirement={this.createOrDeleteRequirement} />
                }
                <form className='todo-edit-form' id={`todo-edit-form-${id}`} onBlur={this.updateTodo} onSubmit={this.updateTodo} >
                    <input name='text' className='todo-edit-form-textfield' onChange={this.handleTextChange} placeholder='I want to...' defaultValue={text}/>
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

export default TodoItem;