import React from 'react';
import { connect } from 'react-redux';

import Preloader from '../preloader/preloader.component';
import ToDoContainer from '../to-do-container/to-do-container.component';

import { setToDos } from '../../redux/to-dos/to-dos.actions';
import { setRewards, setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { setColorTheme } from '../../redux/user/user.actions';

class DataLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataLoaded: false
        }
    }

    async componentDidMount() {
        const userData = await this.fetchUserData();

        await this.applyUserData(userData);

        this.applySettings(userData.settings);

        this.setState({
            dataLoaded: true
        });
    }

    fetchUserData = async () => {
        if (this.props.currentUser) {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            });

            const data = await response.json();

            const userData = {
                toDos: data[0],
                rewards: data[1],
                requirements: data[2],
                settings: data[3]
            }

            return userData;
        }
    }

    applyUserData = async userData => {
        const {
            setToDos,
            setRewards,
            setRequirements,
        } = this.props;

        setToDos(userData.toDos);

        await setRequirements(userData.requirements);
        await setRewards(userData.rewards);

        this.assignUnlock(userData.rewards, userData.requirements);
        this.applySettings(userData.settings);
    }

    assignUnlock = (rewards, requirements)=> {
        if (rewards && requirements) {
            rewards.forEach(reward => {
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

    applySettings = settings => {
        const settingsActions = {
            color_theme: this.props.setColorTheme
        }

        settings.forEach(setting => {
            const key = Object.keys(setting)[0];
            const value = setting[key];
            const settingAction = settingsActions[key];

            settingAction(value);

            switch (key) {
                case 'color_theme':
                    this.applyColorTheme(value);
                    break;
                default:
                    return null;
            }
        });
    }

    applyColorTheme = colorName => {
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
            default:
                return null;
        }

        document.body.style.setProperty('--color-primary', color);
        document.body.style.setProperty('--color-primary-faded', `rgba(${colorRGB}, .7)`);
        document.body.style.setProperty('--color-primary-superfaded', `rgba(${colorRGB}, .1)`);
        document.body.style.setProperty('--color-primary-dark', colorDark);
    }

    render() {
        const { dataLoaded } = this.state;

        return (
            dataLoaded ?
                <ToDoContainer currentUser={this.props.currentUser} />
            :
                <Preloader />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setToDos: toDos => dispatch(setToDos(toDos)),
    setRewards: rewards => dispatch(setRewards(rewards)),
    setSelectedReward: reward => dispatch(setSelectedReward(reward)),
    setIsUnlocked: requirements => dispatch(setIsUnlocked(requirements)),
    setRequirements: requirements => dispatch(setRequirements(requirements)),
    setColorTheme: color => dispatch(setColorTheme(color))
});

export default connect(null, mapDispatchToProps)(DataLoader);