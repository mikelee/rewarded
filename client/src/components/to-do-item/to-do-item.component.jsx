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

    render() {
        const { id, text } = this.props;

        return (
            <div className='to-do-item'>
                <div className='check-and-todo'>
                    <ToggleButton className='toggle-button' value="check" >
                        <CheckRounded fontSize='large' />
                    </ToggleButton>
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