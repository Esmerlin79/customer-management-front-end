import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authService } from '../../services/authService';
import { LoadingStatus, LoginCredentials, PublicUser } from '../../types';

const STORAGE_KEY = 'oriontek.token';

interface AuthState {
  user: PublicUser | null;
  token: string | null;
  status: LoadingStatus;
  error: string | null;
  restoring: boolean;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null,
  status: 'idle',
  error: null,
  restoring:
    typeof window !== 'undefined' && !!localStorage.getItem(STORAGE_KEY),
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem(STORAGE_KEY, response.token);
    return response;
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restore',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      return rejectWithValue('Sin token');
    }
    try {
      const user = await authService.me();
      return { user, token };
    } catch (err) {
      localStorage.removeItem(STORAGE_KEY);
      return rejectWithValue((err as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem(STORAGE_KEY);
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      state.restoring = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ user: PublicUser; token: string }>) => {
          state.status = 'success';
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Error al iniciar sesión';
      })

      .addCase(restoreSession.pending, (state) => {
        state.restoring = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.restoring = false;
        state.status = 'success';
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.restoring = false;
        state.status = 'idle';
      });
  },
});

export const { signOut, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
