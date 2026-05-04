import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface UIState {
  notifications: Notification[];
  sidebarOpen: boolean;
}

const initialState: UIState = {
  notifications: [],
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notifications.push(action.payload);
      },
      prepare: (message: string, type: NotificationType = 'info') => ({
        payload: {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          message,
          type,
        },
      }),
    },
    closeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { showNotification, closeNotification, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
