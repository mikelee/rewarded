import React from 'react';

import './to-do-item.styles.scss';

import { CheckRounded } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { Button, TextField } from '@material-ui/core';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    editItem = event => {
        event.preventDefault();
        const data = {
            id: this.props.id,
            text: this.state.text
        }

        fetch(`http://localhost:4444/api/todo/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(() => this.props.updateState())
    }

    deleteItem = event => {
        event.preventDefault();

        fetch(`http://localhost:4444/api/todo/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            }
        })
        .then(() => this.props.updateState())
    }

    handleChange = event => {
        const { value } = event.target;
        
        this.setState({
            text: value
        })
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
        .then(() => this.props.updateState())
    }

    createOrDeleteRequirement = () => {
        let selected = this.props.selectedReward === this.props.associatedReward;
        
        const data = {
            toDoId: this.props.id,
            rewardId: this.props.selectedReward,
            selected
        }
        
        fetch(`http://localhost:4444/api/requirements/toggle`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
    }

    render() {
        const { id, text, completed, selectedReward, associatedReward } = this.props;

        return (
            <div className='to-do-item'>
                <div className='check-and-todo'>
                    {selectedReward === null
                    ?
                        <ToggleButton className='toggle-button' value="check" selected={completed === 1 ? true : false} onChange={this.toggleToDoCompleted}>
                            <CheckRounded fontSize='large' />
                        </ToggleButton>
                    :
                        <ToggleButton className='toggle-button' value="check" selected={selectedReward === associatedReward ? true : false} onChange={this.createOrDeleteRequirement}>
                            <CheckRounded fontSize='large' />
                        </ToggleButton>
                    }
                    <form id={`edit-form-${id}`} onSubmit={this.editItem} >
                        <TextField id='standard-basic' name='text' className='text-field' onChange={this.handleChange} placeholder='I want to...' defaultValue={text}/>
                    </form>
                </div>
                <div className='buttons'>
                    <Button form={`edit-form-${id}`}  className='edit-button' type='submit' variant='outlined'>Edit</Button>
                    <form className='delete-form' onSubmit={this.deleteItem}>
                        <Button type='submit' variant='contained' color='secondary'>Delete</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ToDoItem;