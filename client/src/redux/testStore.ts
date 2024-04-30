import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { ReduxState } from './store';

const testStoreState: ReduxState = {
    user: {
        currentUser: {
            userId: 1,
            username: 'Test User'
        },
        settings: {
            colorTheme: 'purple'
        }
    },
    todos: {
        todos: [
            {
                todoId: 1,
                text: 'Todo 1',
                completed: false,
                timestamp: '2023-03-08T06:49:33.913Z'
            },
            {
                todoId: 2,
                text: 'Todo 2',
                completed: true,
                timestamp: '2023-03-08T06:49:43.318Z'
            },
            {
                todoId: 3,
                text: 'Todo 3',
                completed: false,
                timestamp: '2023-03-08T06:49:47.183Z'
            }
        ]
    },
    rewards: {
        rewards: [
            {
                rewardId: 1,
                text: 'Reward 1',
                timestamp: '2023-03-08T06:49:53.064Z',
                completed: false
            },
            {
                rewardId: 2,
                text: 'Reward 2',
                timestamp: '2023-03-08T06:49:58.519Z',
                completed: true
            },
            {
                rewardId: 3,
                text: 'Reward 3',
                timestamp: '2023-03-08T06:50:03.270Z',
                completed: true
            }
        ],
        selectedRewardId: null
    },
    requirements: {
        requirements: [
            {
                rewardId: 1,
                todoId: 1,
                text: 'Todo 1',
                completed: false,
                timestamp: '2023-03-08T06:49:33.913Z'
            },
            {
                rewardId: 1,
                todoId: 2,
                text: 'Todo 2',
                completed: true,
                timestamp: '2023-03-08T06:49:43.318Z'
            },
            {
                rewardId: 2,
                todoId: 2,
                text: 'Todo 2',
                completed: true,
                timestamp: '2023-03-08T06:49:43.318Z'
            }
        ]
    },
    menu: {
        visible: false,
        sort: 'Newest First',
        submenuCategory: null
    },
    temporary: {
        loggedOutMessage: false
    },
    _persist: {
        version: -1,
        rehydrated: false
    }
}

export const testStore = configureStore({
    reducer: rootReducer,
    preloadedState: testStoreState,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        });

        return defaultMiddleware;
    }
});

export default testStore;