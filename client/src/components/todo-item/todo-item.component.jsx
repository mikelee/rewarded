import React from 'react';

import './todo-item.styles.scss';

import ToggleButton from '../toggle-button/toggle-button.component';
import { Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    handleTextChange = event => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    updateTodo = event => {
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
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchTodos())
        .then(() => this.props.fetchRequirements());
    }

    deleteTodo = event => {
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
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchTodos())
        .then(() => this.props.fetchRequirements());
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
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchTodos())
        .then(() => this.props.fetchRequirements())
    }

    createOrDeleteRequirement = () => {
        let selected = this.props.selectedReward === this.props.associatedReward;
        
        const data = {
            todoId: this.props.id,
            rewardId: this.props.selectedReward,
            selected
        }
        
        fetch('/api/requirement/toggle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.props.fetchTodosForSelection();
            this.props.fetchRequirements();
        });
    }

    render() {
        const { id, text, completed, selectedReward, associatedReward } = this.props;

        return (
            <div className='todo'>
                {!selectedReward
                ? <ToggleButton type='forTodo' completed={completed} toggleTodoCompleted={this.toggleTodoCompleted} />
                : <ToggleButton type='forRequirement' selectedReward={selectedReward} associatedReward={associatedReward} completed={completed} toggleRequirement={this.createOrDeleteRequirement} />
                }
                <form className='todo-edit-form' id={`todo-edit-form-${id}`} onBlur={this.updateTodo} onSubmit={this.updateTodo} >
                    <input name='text' className='todo-edit-form-textfield' onChange={this.handleTextChange} placeholder='I want to...' defaultValue={text}/>
                </form>
                {!selectedReward
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