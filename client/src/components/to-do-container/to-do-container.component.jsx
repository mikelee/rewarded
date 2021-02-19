import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';
import AddItem from '../add-item/add-item.component';
import RewardItem from '../reward-item/reward-item.component';

import { getToDos } from '../../redux/to-dos/to-dos.selectors'
import { setToDos } from '../../redux/to-dos/to-dos.actions';
import { getRewards, getSelectedReward } from '../../redux/rewards/rewards.selectors'
import { setRewards, setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { getRequirements } from '../../redux/requirements/requirements.selectors';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { getColorTheme } from '../../redux/user/user.selectors';
import { setColorTheme } from '../../redux/user/user.actions';

class ToDoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.selectionTitle = React.createRef();
    }

    componentDidMount() {
        this.fetchToDosRewardsAndRequirements();
        this.props.setSelectedReward(null);
    }

    assignUnlock = (rewards) => {
        if (rewards) {
            const { requirements } = this.props;

            rewards.forEach((reward) => {
                const isUnlocked = requirements.filter(requ => requ.reward_id === reward.reward_id).every((requirement) => requirement.completed === 1);
                const rewardId = reward.reward_id;

                const data = {
                    rewardId,
                    isUnlocked
                }
                this.props.setIsUnlocked(data);
            });
        } else {
            const { rewards, requirements } = this.props;

            rewards.forEach(reward => {
                const isUnlocked = requirements.filter(requirment => requirment.reward_id === reward.reward_id).every((requirement) => requirement.completed === 1);
                const rewardId = reward.reward_id;

                const data = {
                    rewardId,
                    isUnlocked
                }
                this.props.setIsUnlocked(data);
            });
        }
    }

    fetchToDosRewardsAndRequirements = () => {
        if (this.props.currentUser) {
            fetch('/api', {
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
            .then(json => {
                this.props.setToDos(json[0]);
                this.props.setRequirements(json[2]);
                this.props.setRewards(json[1]);
                this.assignUnlock(json[1]);

                const colorTheme = json[3][0].color_theme;
                this.props.setColorTheme(colorTheme);
            })
            .then(() => {
                this.updateColorTheme()
            });
        }
    }

    updateColorTheme = () => {
        const colorName = this.props.colorTheme;

        let color;
        let colorRGB;
        let colorDark;

        switch (colorName) {
            case 'red':
                color = '#f0654f';
                colorRGB = '240, 101, 79';
                colorDark = '#c83c27';
                break;
            case 'blue':
                color = '#4195f0';
                colorRGB = '65, 149, 240';
                colorDark = '#196ec8';
                break;
            case 'green':
                color = '#2db92d';
                colorRGB = '45, 185, 45';
                colorDark = '#059105';
                break;
            case 'purple':
                color = '#707eff';
                colorRGB = '112, 126, 255';
                colorDark = '#4856d7'
                break;
        }

        document.body.style.setProperty('--color-primary', color);
        document.body.style.setProperty('--color-primary-faded', `rgba(${colorRGB}, .7)`);
        document.body.style.setProperty('--color-primary-superfaded', `rgba(${colorRGB}, .1)`);
        document.body.style.setProperty('--color-primary-dark', colorDark);
    }

    fetchToDos = () => {
        if (this.props.currentUser) {
            fetch('/api/todo/get', {
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
            .then(json => this.props.setToDos(json));
        }
    }

    fetchRewards = () => {
        if (this.props.currentUser) {
            fetch('/api/reward/get', {
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
            .then(json => this.props.setRewards(json));
        }
    }

    fetchRequirements = () => {
        const data = {
            userId: this.props.currentUser.user_id
        }

        fetch('/api/requirement/get', {
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
        .then(json => this.props.setRequirements(json))
        .then(() => this.assignUnlock());
    }

    fetchToDosForSelection = () => {
        const data = {
            reward_id: this.props.selectedReward,
            owner_id: this.props.currentUser.user_id
        }

        fetch('/api/get-requirements-and-todos', {
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
        .then(json => this.props.setToDos(json));
    }

    scrollToSelection = () => {
        this.selectionTitle.current.scrollIntoView({behavior: 'smooth'});
    }

    exitSelection = () => {
        this.props.setSelectedReward(null);
        this.fetchToDos();
    }

    render() {
        const { toDos, rewards, selectedReward } = this.props;

        return (
            <div className='to-do-container'>
                {selectedReward
                    ? <h2 className='title' ref={this.selectionTitle}>Select Reward Requirements</h2>
                    : <h2 className='title'>To Do</h2>
                }
                {this.props.selectedReward !== null ? <button className='exit-button' onClick={this.exitSelection}>Done</button> : null}
                {toDos ? toDos.map(toDo => <ToDoItem fetchToDos={this.fetchToDos} fetchRequirements={this.fetchRequirements} fetchToDosForSelection={this.fetchToDosForSelection} key={toDo.to_do_id} id={toDo.to_do_id} text={toDo.text} completed={toDo.completed} selectedReward={this.props.selectedReward} associatedReward={toDo.reward_id} />) : null}
                <AddItem fetchToDos={this.fetchToDos} type='todo' currentUser={this.props.currentUser} />

                <h3 className='title'>Rewards</h3>
                {rewards ? rewards.map(reward => <RewardItem fetchRewards={this.fetchRewards} fetchRequirements={this.fetchRequirements} key={reward.reward_id} id={reward.reward_id} text={reward.text} fetchToDosForSelection={this.fetchToDosForSelection} scroll={this.scrollToSelection}/>) : null}
                <AddItem fetchRewards={this.fetchRewards} type='reward' currentUser={this.props.currentUser} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    toDos: getToDos,
    rewards: getRewards,
    selectedReward: getSelectedReward,
    requirements: getRequirements,
    colorTheme: getColorTheme
});

const mapDispatchToProps = dispatch => ({
    setToDos: toDos => dispatch(setToDos(toDos)),
    setRewards: rewards => dispatch(setRewards(rewards)),
    setSelectedReward: reward => dispatch(setSelectedReward(reward)),
    setIsUnlocked: requirements => dispatch(setIsUnlocked(requirements)),
    setRequirements: requirements => dispatch(setRequirements(requirements)),
    setColorTheme: color => dispatch(setColorTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);