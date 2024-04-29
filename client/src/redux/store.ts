import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware();
        defaultMiddleware.concat(logger);
        return defaultMiddleware;
    }
});

export type ReduxState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);
export default { store, persistStore };