import React from 'react';

import './to-do-item.styles.scss';

import { CheckRounded, Clear } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';

class ToDoItem extends React.Component {
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

        fetch(`http://localhost:4444/api/todo/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchToDos())
        .then(() => this.props.fetchRequirements());
    }

    deleteToDo = event => {
        event.preventDefault();

        const data = {
            id: this.props.id
        }

        fetch(`http://localhost:4444/api/todo/delete`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchToDos())
        .then(() => this.props.fetchRequirements());
    }

    toggleToDoCompleted = () => {
        const data = {
            id: this.props.id
        }

        fetch(`http://localhost:4444/api/todo/complete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.fetchToDos())
        .then(() => this.props.fetchRequirements())
    }

    createOrDeleteRequirement = () => {
        let selected = this.props.selectedReward === this.props.associatedReward;
        
        const data = {
            toDoId: this.props.id,
            rewardId: this.props.selectedReward,
            selected
        }
        
        fetch(`http://localhost:4444/api/requirement/toggle`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(this.props.fetchToDosForSelection())
        .then(this.props.fetchRequirements());
    }

    render() {
        const { id, text, completed, selectedReward, associatedReward } = this.props;

        return (
            <div className='todo'>
                <div className='todo-check'>
                    {!selectedReward
                    ?
                        <ToggleButton className='todo-toggle-button' value='check' selected={completed === 1 ? true : false} onChange={this.toggleToDoCompleted}>
                            <CheckRounded className='todo-toggle-button-check-icon' fontSize='large' />
                        </ToggleButton>
                    :
                        <ToggleButton className='todo-toggle-button' value='check' selected={selectedReward === associatedReward ? true : false} onChange={this.createOrDeleteRequirement}>
                            <CheckRounded fontSize='large' />
                        </ToggleButton>
                    }
                </div>
                <form className='todo-edit-form' id={`todo-edit-form-${id}`} onBlur={this.updateTodo} onSubmit={this.updateTodo} >
                    <input name='text' className='todo-edit-form-textfield' onChange={this.handleTextChange} placeholder='I want to...' defaultValue={text}/>
                </form>
                {!selectedReward
                ?
                    <form className='todo-delete-form' onSubmit={this.deleteToDo}>
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

export default ToDoItem;