import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700, mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        La ruta a la que intentaste acceder no existe o fue movida.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
};
