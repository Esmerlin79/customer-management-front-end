import { useCallback } from 'react';

import {
  closeNotification,
  NotificationType,
  showNotification,
} from '../store/slices/uiSlice';

import { useAppDispatch } from './redux';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const notify = useCallback(
    (message: string, type: NotificationType = 'info') => {
      dispatch(showNotification(message, type));
    },
    [dispatch]
  );

  const close = useCallback(
    (id: string) => {
      dispatch(closeNotification(id));
    },
    [dispatch]
  );

  return { notify, close };
};
