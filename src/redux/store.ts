import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth/auth.slice'
import { quizSlice } from './quiz/quiz.slice'
import { userSlice } from './user/user.slice'

const rootReducer = combineReducers({
  quiz: quizSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
          // serializableCheck: {
          //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          // },
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;