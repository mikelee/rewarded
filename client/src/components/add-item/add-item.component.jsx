import React from 'react';

import './add-item.styles.scss';

import { AddRounded } from '@material-ui/icons';

class addItem extends React.Component {

    addTodo = () => {
        fetch(`/api/${this.props.type}/create`, {
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
                ? this.props.fetchTodos()
                : this.props.fetchRewards()
        });
    }
    
    render() {
        const { type } = this.props;
        
        return (
            <div className={`add-item add-item-${type}`} onClick={this.addTodo} >
                <div className='plus-container'>
                    <AddRounded className='plus-icon' fontSize='large' />
                </div>
                <p className='add-item-text' >{type === 'todo' ? 'Add To Do' : 'Add Reward'}</p>
            </div>
        );
    }
};

export default addItem;