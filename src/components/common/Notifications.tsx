import { Alert, Snackbar } from '@mui/material';

import { useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';

export const Notifications = () => {
  const notifications = useAppSelector((s) => s.ui.notifications);
  const { close } = useNotification();

  return (
    <>
      {notifications.map((n, index) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={4500}
          onClose={() => close(n.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ bottom: `${24 + index * 64}px !important` }}
        >
          <Alert
            severity={n.type}
            onClose={() => close(n.id)}
            variant="filled"
            sx={{ minWidth: 280 }}
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
