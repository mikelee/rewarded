import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import todosReducer from './todos/todos.reducer';
import rewardsReducer from './rewards/rewards.reducer';
import requirementsReducer from './requirements/requirements.reducer';
import menuReducer from './menu/menu.reducer';
import temporaryReducer from './temporary/temporary.reducer';

import userActionTypes from './user/user.types';

import { Reducer } from 'redux';
import { ReduxState, Action } from '../../types';

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
    if (action.type === userActionTypes.CLEAR_ALL) {
        state = undefined
    }

    return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer);