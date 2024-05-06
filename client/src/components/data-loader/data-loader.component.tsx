import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../utils';
import { applyColorTheme } from '../color-theme/color-theme.component';

import { Settings, UserData } from '../../../types';

import Preloader from '../preloader/preloader.component';
import UserPage from '../../pages/user-page/user-page.page';

import { todosSet } from '../../redux/todos/todosSlice';
import { rewardsSet } from '../../redux/rewards/rewardsSlice';
import { requirementsSet } from '../../redux/requirements/requirementsSlice';
import { colorThemeSet } from '../../redux/user/userSlice';
import { sortSet } from '../../redux/menu/menuSlice';

export const DataLoader: React.FC = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        async function asyncFetchUserData() {
            const userData = await fetchUserData();
    
            if (userData) {
                applyUserData(userData);
        
                setDataLoaded(true);
            }
        }

        asyncFetchUserData();
    }, []);

    const fetchUserData = async () => {
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

    const applyUserData = (userData: UserData) => {
        dispatch(todosSet(userData.todos));
        dispatch(requirementsSet(userData.requirements));
        dispatch(rewardsSet(userData.rewards));

        applySettings(userData.settings);
    }

    const applySettings = (settings: Settings) => {
        const settingsActions = new Map();
        settingsActions.set('color_theme', colorThemeSet);
        settingsActions.set('sort', sortSet);

        for (const setting in settings) {
            const settingAction = settingsActions.get(setting);
            const settingValue = settings[setting];

            dispatch(settingAction(settingValue));

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

    return (
        dataLoaded ?
            <UserPage />
        :
            <Preloader />
    );
}

export default DataLoader;