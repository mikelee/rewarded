import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';
import AddItem from '../add-item/add-item.component';
import RewardItem from '../reward-item/reward-item.component';

import { setReward } from '../../redux/rewards/rewards.selectors'
import { selectReward } from'../../redux/rewards/rewards.actions';

class ToDoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.getToDosAndRewards = this.getToDosAndRewards.bind(this);

        this.state = {
            currentUser: null,
            to_dos: null,
            rewards: null,
            requirements: null
        }
    }

    componentDidMount() {
        this.getToDosAndRewards();
        this.props.selectReward(null);
    }

    changeToDos = () => {
        const data = {
            reward_id: this.props.selectedReward,
            owner_id: this.props.currentUser.user_id
        }

        fetch(`http://localhost:4444/api/get-requirements-and-todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => this.setState({
            to_dos: json
        }))
    }

    exitSelection = () => {
        this.props.selectReward(null);
        this.getToDos();
    }

    getToDos = () => {
        if (this.props.currentUser) {
            fetch('http://localhost:4444/api/todo/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => this.setState({
                to_dos: json,
            }));
        }
    }

    getToDosAndRewards() {
        if (this.props.currentUser) {
            fetch('http://localhost:4444/api', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => this.setState({
                currentUser: this.props.currentUser,
                to_dos: json[0],
                rewards: json[1],
                requirements: json[2]
            }));
        }
    }

    render() {
        return (
            <div className='to-do-container'>
                <h2 className='title'>To Do</h2>
                {this.props.selectedReward !== null ? <button onClick={this.exitSelection}>Exit Selection</button> : null}
                {this.state.to_dos ? this.state.to_dos.map(to_do => <ToDoItem key={to_do.to_do_id} id={to_do.to_do_id} text={to_do.text} completed={to_do.completed} selectedReward={this.props.selectedReward} associatedReward={to_do.reward_id} updateState={this.getToDosAndRewards} />) : null}
                <AddItem type='todo' updateState={this.getToDosAndRewards} currentUser={this.props.currentUser} />

                <h3 className='title'>Rewards</h3>
                {this.state.rewards ? this.state.rewards.map(reward => <RewardItem key={reward.reward_id} id={reward.reward_id} text={reward.text} updateState={this.getToDosAndRewards} changeToDos={this.changeToDos} />) : null}
                <AddItem type='reward' updateState={this.getToDosAndRewards} currentUser={this.props.currentUser} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectedReward: setReward
});

const mapDispatchToProps = dispatch => ({
    selectReward: reward => dispatch(selectReward(reward))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);