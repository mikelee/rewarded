import React from 'react';

import './add-item.styles.scss';

import { ToggleButton } from '@material-ui/lab';
import { AddRounded } from '@material-ui/icons';

class addItem extends React.Component {

    addToDo = () => {
        fetch('http://localhost:4444/api/todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(this.props.currentUser)
        })
        .then(() => this.props.updateState())
    }
    
    render() {
        return (
            <div className='add-item' onClick={this.addToDo} >
                <ToggleButton className='add-item-toggle-button' value='plus' >
                    <AddRounded fontSize='large' />
                </ToggleButton>
                <p className='add-item-text' >Add Item</p>
            </div>
        );
    }
};

export default addItem;