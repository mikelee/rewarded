import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userSlice';
import todosReducer from './todos/todosSlice';
import rewardsReducer from './rewards/rewardsSlice';
import requirementsReducer from './requirements/requirementsSlice';
import menuReducer from './menu/menuSlice';
import temporaryReducer from './temporary/temporarySlice';

import { stateCleared } from './extraActions';

import { Reducer, Action } from 'redux';

const persistConfig = {
    key: 'root',
    blacklist: ['temporary'],
    storage
};

const appReducer = combineReducers({
    user: userReducer,
    todos: todosReducer,
    rewards: rewardsReducer,
    requirements: requirementsReducer,
    menu: menuReducer,
    temporary: temporaryReducer
});

const rootReducer: Reducer<ReduxState, Action> = (state, action) => {
    if (action.type === stateCleared.type) {
        state = undefined
    }

    return appReducer(state, action);
}

export type ReduxState = ReturnType<typeof appReducer>;

export default persistReducer(persistConfig, rootReducer);