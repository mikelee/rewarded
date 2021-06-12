import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import { Todo, Reward, Requirement, User, setIsUnlockedData } from '../../../types';

import Preloader from '../preloader/preloader.component';
import TodoContainer from '../todo-container/todo-container.component';

import { setTodos } from '../../redux/todos/todos.actions';
import { setRewards, setSelectedReward, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { setColorTheme } from '../../redux/user/user.actions';
import { Action } from 'redux';


interface Props extends DispatchProps {
    currentUser: User,
    rewards?: Reward[],
    requirements?: Requirement[]
}

interface StateProps {
    currentUser: User,
    rewards?: Reward[],
    requirements?: Requirement[]
}

interface DispatchProps {
    setTodos?: (todos: Todo[]) => void,
    setRewards?: (rewards: Reward[]) => void,
    setSelectedReward?: (reward: Reward) => void,
    setIsUnlocked?: (data: setIsUnlockedData) => void,
    setRequirements?: (requirements: Requirement[]) => void,
    setColorTheme?: (color: string) => void
}

interface State {
    dataLoaded: boolean
}

class DataLoader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dataLoaded: false
        }
    }

    async componentDidMount() {
        const userData: any = await this.fetchUserData();

        this.applyUserData(userData);
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
                    'Access-Control-Allow-Credentials' : 'true'
                },
                body: JSON.stringify(this.props.currentUser)
            });

            const data = await response.json();

            const userData = {
                todos: data[0],
                rewards: data[1],
                requirements: data[2],
                settings: data[3]
            }

            return userData;
        }
    }

    applyUserData = (userData: any) => {
        const {
            setTodos,
            setRewards,
            setRequirements,
        } = this.props;

        if (setTodos && setRequirements && setRewards) {
            setTodos(userData.todos);
            setRequirements(userData.requirements);
            setRewards(userData.rewards);

            this.assignUnlock(userData.rewards, userData.requirements);
            this.applySettings(userData.settings);
        }

    }

    assignUnlock = (rewards: Reward[], requirements: Requirement[])=> {
        if (rewards && requirements) {
            rewards.forEach((reward: Reward) => {
                const isUnlocked = requirements.filter((requ: Requirement) => requ.reward_id === reward.reward_id).every((requirement) => requirement.completed === 1);
                const rewardId = reward.reward_id;

                const data = {
                    rewardId,
                    isUnlocked
                }
                if (this.props.setIsUnlocked) {
                    this.props.setIsUnlocked(data);
                }
            });
        } else {
            const { rewards, requirements, setIsUnlocked } = this.props;

            if (rewards && requirements && setIsUnlocked) {

                rewards.forEach(reward => {
                    const isUnlocked = requirements.filter((requirment: Requirement) => requirment.reward_id === reward.reward_id).every((requirement: Requirement) => requirement.completed === 1);
                    const rewardId = reward.reward_id;

                    const data = {
                        rewardId,
                        isUnlocked
                    }
                    setIsUnlocked(data);
                });
            }

        }
    }

    applySettings = (settings: any) => {
        const settingsActions = new Map();
        settingsActions.set('color_theme', this.props.setColorTheme)

        settings.forEach((setting: any) => {
            const key: string = Object.keys(setting)[0];
            const value = setting[key];
            const settingAction: any = settingsActions.get(key);

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

    applyColorTheme = (colorName: string) => {
        let color: string;
        let colorRGB: string;
        let colorDark: string;

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
                <TodoContainer currentUser={this.props.currentUser} />
            :
                <Preloader />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setTodos: (todos: Todo[]) => dispatch(setTodos(todos)),
    setRewards: (rewards: Reward[]) => dispatch(setRewards(rewards)),
    setSelectedReward: (reward: Reward) => dispatch(setSelectedReward(reward)),
    setIsUnlocked: (data: setIsUnlockedData) => dispatch(setIsUnlocked(data)),
    setRequirements: (requirements: Requirement[]) => dispatch(setRequirements(requirements)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color))
});

export default connect<StateProps | null, DispatchProps>(null, mapDispatchToProps)(DataLoader);