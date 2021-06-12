import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import todosReducer from './todos/todos.reducer';
import rewardReducer from './rewards/rewards.reducer';
import requirementReducer from './requirements/requirements.reducer';
import menuReducer from './menu/menu.reducer';
import temporaryReducer from './temporary/temporary.reducer';

import { userActionTypes } from './user/user.types';

const persistConfig = {
    key: 'root',
    blacklist: ['temporary'],
    storage
};

const appReducer = combineReducers({
    user: userReducer,
    todos: todosReducer,
    rewards: rewardReducer,
    requirements: requirementReducer,
    menu: menuReducer,
    temporary: temporaryReducer
});

const rootReducer = (state, action) => {
    if (action.type === userActionTypes.CLEAR_ALL) {
        state = undefined
    }

    return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer);