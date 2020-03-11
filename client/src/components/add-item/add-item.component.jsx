import React from 'react';

import './add-item.styles.scss';

import { ToggleButton } from '@material-ui/lab';
import { AddRounded } from '@material-ui/icons';

class addItem extends React.Component {

    addToDo = () => {
        fetch(`http://localhost:4444/api/${this.props.type}/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(this.props.currentUser)
        })
        .then(() => {
            this.props.type === 'todo'
                ? this.props.fetchToDos()
                : this.props.fetchRewards()
        });
    }
    
    render() {
        const { type } = this.props;
        
        return (
            <div className={`add-item add-item-${type}`} onClick={this.addToDo} >
                <ToggleButton className='add-item-toggle-button' value='plus' >
                    <AddRounded className='add-item-icon' fontSize='large' />
                </ToggleButton>
                <p className='add-item-text' >{type === 'todo' ? 'Add To Do' : 'Add Reward'}</p>
            </div>
        );
    }
};

export default addItem;