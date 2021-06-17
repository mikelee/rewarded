import React from 'react';

import './add-item.styles.scss';

import { User } from '../../../types';

import { AddRounded } from '@material-ui/icons';

interface addItemProps {
    type: string,
    currentUser: User,
    fetchTodos?: () => void,
    fetchRewards?: () => void
}

class addItem extends React.Component<addItemProps> {

    addTodo = () => {
        fetch(`/api/${this.props.type}/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : 'true'
            },
            body: JSON.stringify(this.props.currentUser)
        })
        .then(() => {
            if (this.props.type === 'todo' && this.props.fetchTodos) {
                this.props.fetchTodos();
            } else if (this.props.fetchRewards) {
                this.props.fetchRewards();
            }
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