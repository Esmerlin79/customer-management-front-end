import { Box, LinearProgress } from '@mui/material';

export const RouteFallback = () => (
  <Box sx={{ width: '100%', mt: -2, mb: 2 }}>
    <LinearProgress />
  </Box>
);
