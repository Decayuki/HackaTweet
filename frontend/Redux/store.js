
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './Services/usersApi';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

