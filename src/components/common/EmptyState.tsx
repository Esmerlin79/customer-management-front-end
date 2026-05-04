import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = ({ title, description, icon, action }: Props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 2,
      textAlign: 'center',
      color: 'text.secondary',
    }}
  >
    {icon ?? <InboxIcon sx={{ fontSize: 64, opacity: 0.5, mb: 2 }} />}
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" sx={{ mb: 3, maxWidth: 360 }}>
        {description}
      </Typography>
    )}
    {action && (
      <Button variant="contained" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </Box>
);
