import { legacy_createStore, compose, applyMiddleware, Store } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers, { initialState } from './reducers';
import { AppState, Action } from '../types';

type PersistedAppState = AppState & { _persist: any };

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store: Store<AppState, Action> = legacy_createStore(
    persistedReducer,
    initialState as PersistedAppState,
    compose(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { persistor, store };
