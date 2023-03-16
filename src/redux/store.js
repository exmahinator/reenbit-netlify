import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { charactersReducer } from './characters/characterSlice';

const charactersPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['characters', 'character', 'filterName', 'page', "searchValue"],
};

export const store = configureStore({
  reducer: {
    root: persistReducer(charactersPersistConfig, charactersReducer),
  },
  middleware: getDefaultMiddlewares =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
