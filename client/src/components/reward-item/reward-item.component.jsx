import React from 'react';

import './reward-item.styles.scss';

import { Button, TextField } from '@material-ui/core';

class RewardItem extends React.Component {
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

        fetch(`http://localhost:4444/api/reward/${this.props.id}`, {
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

        fetch(`http://localhost:4444/api/reward/${this.props.id}`, {
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
            <div className='reward-item'>
                <div className='reward'>
                    <form id={`reward-form-${id}`} onSubmit={this.editItem} >
                        <TextField id='standard-basic' defaultValue={text} name='text' onChange={this.handleChange} ></TextField>
                    </form>
                </div>
                <div className='to-complete'>
                    <p>To Dos go here</p>
                </div>
                <div className='buttons'>
                    <Button form={`reward-form-${id}`} type ='submit' variant='outlined'>Edit</Button>
                    <form onSubmit={this.deleteItem}>
                        <Button type='submit' variant='contained' color='secondary'>Delete</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default RewardItem;