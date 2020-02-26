import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import toDosReducer from './to-dos/to-dos.reducer';
import rewardReducer from './rewards/rewards.reducer';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    user: userReducer,
    to_dos: toDosReducer,
    rewards: rewardReducer 
});

export default persistReducer(persistConfig, rootReducer);