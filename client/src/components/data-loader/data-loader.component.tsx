import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../utils';
import { applyColorTheme } from '../color-theme/color-theme.component';

import { Dispatch } from 'redux';
import { SortOrder } from '../sort/sort.component';
import { Todo, Reward, Requirement, User, Settings, UserData } from '../../../types';

import Preloader from '../preloader/preloader.component';
import UserPage from '../../pages/user-page/user-page.page';

import { setTodos } from '../../redux/todos/todos.actions';
import { setRewards } from '../../redux/rewards/rewards.actions';
import { setRequirements } from '../../redux/requirements/requirements.actions';
import { setColorTheme } from '../../redux/user/user.actions';
import { setSort } from '../../redux/menu/menu.actions';
import { Action } from 'redux';

interface OwnProps {
    currentUser: User
}

interface DispatchProps {
    setTodos: (todos: Todo[]) => void,
    setRewards: (rewards: Reward[]) => void,
    setRequirements: (requirements: Requirement[]) => void,
    setColorTheme: (color: string) => void,
    setSort: (sort: SortOrder) => void,
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
                settings: data[3][0]
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
            setRequirements
        } = this.props;

        setTodos(userData.todos);
        setRequirements(userData.requirements);
        setRewards(userData.rewards);

        this.applySettings(userData.settings);
    }

    applySettings = (settings: Settings) => {
        const settingsActions = new Map();
        settingsActions.set('color_theme', this.props.setColorTheme);
        settingsActions.set('sort', this.props.setSort);

        for (const setting in settings) {
            const settingAction = settingsActions.get(setting);
            const settingValue = settings[setting];

            settingAction(settingValue);

            switch (setting) {
                case 'color_theme':
                    applyColorTheme(settingValue);
                    // for: if colorTheme doesn't exist because the user is using a different computer
                    // or colorTheme is different from a different user previously logged in
                    if (localStorage.getItem('colorTheme') !== settingValue) localStorage.setItem('colorTheme', settingValue);
                    break;
                default:
                    return null;
            }
        }
    }

    render() {
        const { dataLoaded } = this.state;

        return (
            dataLoaded ?
                <UserPage />
            :
                <Preloader />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setTodos: (todos: Todo[]) => dispatch(setTodos(todos)),
    setRewards: (rewards: Reward[]) => dispatch(setRewards(rewards)),
    setRequirements: (requirements: Requirement[]) => dispatch(setRequirements(requirements)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color)),
    setSort: (sort: SortOrder) => dispatch(setSort(sort))
});

export default connect(null, mapDispatchToProps)(DataLoader);