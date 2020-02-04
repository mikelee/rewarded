import React from 'react';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';
import AddItem from '../add-item/add-item.component';
import RewardItem from '../reward-item/reward-item.component';

class ToDoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.getToDosAndRewards = this.getToDosAndRewards.bind(this);

        this.state = {
            currentUser: null,
            to_dos: null,
            rewards: null
        }
    }

    componentDidMount() {
        this.getToDosAndRewards();
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
                to_dos: json[0],
                rewards: json[1]
            }));
        }
    }

    render() {
        return (
            <div className='to-do-container'>
                <h2 className='title'>To Do</h2>
                {this.state.to_dos ? this.state.to_dos.map(to_do => <ToDoItem key={to_do.to_do_id} id={to_do.to_do_id} text={to_do.text} updateState={this.getToDosAndRewards} />) : null}
                <AddItem type='todo' updateState={this.getToDosAndRewards} currentUser={this.props.currentUser} />

                <h3 className='title'>Rewards</h3>
                {this.state.rewards ? this.state.rewards.map(reward => <RewardItem key={reward.reward_id} id={reward.reward_id} text={reward.text} updateState={this.getToDosAndRewards} />) : null}
                <AddItem type='reward' updateState={this.getToDosAndRewards} currentUser={this.props.currentUser} />
            </div>
        );
    }
}

export default ToDoContainer;