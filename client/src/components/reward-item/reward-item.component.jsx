import React from 'react';
import { connect } from 'react-redux'

import './reward-item.styles.scss';

import Requirement from '../requirement/requirement.component';
import { Button, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { selectReward } from'../../redux/rewards/rewards.actions';

class RewardItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            requirements: null
        }
    }

    componentDidMount() {
        this.updateRequirements();
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
    
    updateRequirements = () => {
        const data = {
            id: this.props.id
        }

        fetch(`http://localhost:4444/api/requirements`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                requirements: data
            })
        })
    }

    addRequirement = async () => {
        await this.props.selectReward(this.props.id);

        this.props.changeToDos();
    }

    deleteRequirement = id => {
        return event => {
            event.preventDefault();

            const data = {
                reward_id: this.props.id,
                to_do_id: id
            }

            fetch(`http://localhost:4444/api/requirements/${this.props.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(data)
            })
            .then(() => this.updateRequirements())
        }
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
                        <TextField id='standard-basic' defaultValue={text} name='text' onChange={this.handleChange}></TextField>
                    </form>
                </div>
                <div className='to-complete'>
                    <h3 className='requirements-title'>Requirements</h3>
                    {this.state.requirements !== null ? this.state.requirements.map(requirement => (
                        <Requirement key={requirement.to_do_id} deleteRequirement={this.deleteRequirement} reward_id={id} {...requirement}/>
                    ))
                    : null }
                    <IconButton className='add-requirement-button' onClick={this.addRequirement}>
                        <AddIcon className='add-requirement-icon' fontSize='large'/>
                    </IconButton>
                </div>
                <div className='buttons'>
                    <Button form={`reward-form-${id}`} type='submit' variant='outlined'>Edit</Button>
                    <form onSubmit={this.deleteItem}>
                        <Button type='submit' variant='contained' color='secondary'>Delete</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    selectReward: reward => dispatch(selectReward(reward))
});

export default connect(null, mapDispatchToProps)(RewardItem);