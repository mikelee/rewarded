import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice';
import todosReducer from './slices/todosSlice';
import rewardsReducer from './slices/rewardsSlice';
import requirementsReducer from './slices/requirementsSlice';
import menuReducer from './slices/menuSlice';
import temporaryReducer from './slices/temporarySlice';

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