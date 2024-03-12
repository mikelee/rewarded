// import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// export const store = configureStore(rootReducer);
export const store = configureStore({
    reducer: rootReducer
});
// export const persistor = persistStore(store);
export default { store, persistStore };