import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  message?: string;
  height?: number | string;
}

export const Loading = ({ message = 'Cargando...', height = 200 }: Props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: height,
      gap: 2,
    }}
  >
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);
