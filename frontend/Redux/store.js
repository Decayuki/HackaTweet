
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './Services/usersApi';
import { tweetApi } from './Services/tweetApi';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tweetApi.reducerPath]: tweetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(tweetApi.middleware), 
});