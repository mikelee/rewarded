import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import toDosReducer from './to-dos/to-dos.reducer';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    user: userReducer,
    to_dos: toDosReducer
});

export default persistReducer(persistConfig, rootReducer);