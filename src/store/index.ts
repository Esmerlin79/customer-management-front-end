import { configureStore } from '@reduxjs/toolkit';

import { configureAuth } from '../services/apiClient';

import authReducer, { signOut } from './slices/authSlice';
import addressesReducer from './slices/addressesSlice';
import clientsReducer from './slices/clientsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    addresses: addressesReducer,
    ui: uiReducer,
  },
});

configureAuth(
  () => store.getState().auth.token,
  () => store.dispatch(signOut())
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
