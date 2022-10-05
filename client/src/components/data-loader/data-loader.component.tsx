import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../utils';

import { Dispatch } from 'redux';
import { Todo, Reward, Requirement, User, Setting, UserData, SetIsUnlockedData } from '../../../types';

import Preloader from '../preloader/preloader.component';
import UserPage from '../user-page/user-page.component';

import { setTodos } from '../../redux/todos/todos.actions';
import { setRewards, setIsUnlocked } from '../../redux/rewards/rewards.actions';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { setColorTheme } from '../../redux/user/user.actions';
import { Action } from 'redux';

interface OwnProps {
    currentUser: User,
    rewards?: Reward[],
    requirements?: Requirement[]
}

interface DispatchProps {
    setTodos?: (todos: Todo[]) => void,
    setRewards?: (rewards: Reward[]) => void,
    setIsUnlocked?: (data: SetIsUnlockedData) => void,
    setRequirements?: (requirements: Requirement[]) => void,
    setColorTheme?: (color: string) => void
}

type Props = OwnProps & DispatchProps;

interface State {
    dataLoaded: boolean
}

export class DataLoader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dataLoaded: false
        }
    }

    async componentDidMount() {
        const userData = await this.fetchUserData();

        if (userData) {
            this.applyUserData(userData);
    
            this.setState({
                dataLoaded: true
            });
        }
    }

    fetchUserData = async () => {
        try {
            const data = await fetchData('/api/user-data', 'GET');

            const userData = {
                todos: data[0],
                rewards: data[1],
                requirements: data[2],
                settings: data[3]
            }

            return userData;
        } catch (error) {
            console.log(error)
        }
    }

    applyUserData = (userData: UserData) => {
        const {
            setTodos,
            setRewards,
            setRequirements,
        } = this.props;

        if (setTodos && setRequirements && setRewards) {
            setTodos(userData.todos);
            setRequirements(userData.requirements);
            setRewards(userData.rewards);

            this.assignUnlock(userData.rewards, userData.requirements, this.props.setIsUnlocked);
            this.applySettings(userData.settings);
        }
    }

    assignUnlock = (rewards: Reward[], requirements: Requirement[], setIsUnlocked: ((data: SetIsUnlockedData) => void) | undefined) => {
        rewards.forEach((reward: Reward) => {
            const isUnlocked = requirements.filter(requirement => requirement.rewardId === reward.rewardId).every(requirement => requirement.completed === 1);
            const rewardId = reward.rewardId;

            const data = {
                rewardId,
                isUnlocked
            }
            if (setIsUnlocked) {
                setIsUnlocked(data);
            }
        });
    }

    applySettings = (settings: Setting[]) => {
        const settingsActions = new Map();
        settingsActions.set('color_theme', this.props.setColorTheme);

        settings.forEach(setting => {
            const key: string = Object.keys(setting)[0];
            const value = setting[key];
            const settingAction = settingsActions.get(key);

            settingAction(value);

            switch (key) {
                case 'color_theme':
                    if (value) this.applyColorTheme(value);
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
                <UserPage currentUser={this.props.currentUser} assignUnlock={this.assignUnlock} />
            :
                <Preloader />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setTodos: (todos: Todo[]) => dispatch(setTodos(todos)),
    setRewards: (rewards: Reward[]) => dispatch(setRewards(rewards)),
    setIsUnlocked: (data: SetIsUnlockedData) => dispatch(setIsUnlocked(data)),
    setRequirements: (requirements: Requirement[]) => dispatch(setRequirements(requirements)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color))
});

export default connect(null, mapDispatchToProps)(DataLoader);