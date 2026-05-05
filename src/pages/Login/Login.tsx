import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { OrionTekLogo } from '../../components/common/OrionTekLogo';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearAuthError, signIn } from '../../store/slices/authSlice';
import { colors, gradients } from '../../theme';

export const Login = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, status, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Hooks antes de cualquier early return: el orden tiene que ser estable.
  useEffect(() => () => void dispatch(clearAuthError()), [dispatch]);

  const fromPath = (location.state as { from?: string } | null)?.from ?? '/';
  if (user) {
    return <Navigate to={fromPath} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError('Email y contraseña son obligatorios');
      return;
    }

    await dispatch(signIn({ email: email.trim(), password }));
  };

  const loading = status === 'loading';
  const errorMessage = localError ?? error;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: colors.background,
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '45%',
          background: gradients.navy,
          color: '#FFFFFF',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: gradients.brand,
            opacity: 0.18,
            top: -120,
            right: -100,
            filter: 'blur(8px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: gradients.brand,
            opacity: 0.12,
            bottom: -60,
            left: -80,
            filter: 'blur(8px)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <OrionTekLogo size={56} inverted />
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" sx={{ color: '#FFFFFF', mb: 2, fontSize: '2.75rem' }}>
            Panel de
            <br />
            Gestión
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 380 }}>
            Administrá clientes, direcciones y operaciones de OrionTek desde
            un único lugar. Acceso seguro para empleados autorizados.
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: 'rgba(255,255,255,0.45)', position: 'relative', zIndex: 1 }}
        >
          © {new Date().getFullYear()} OrionTek · Todos los derechos reservados
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 440,
            p: { xs: 3, sm: 5 },
            border: `1px solid ${colors.border}`,
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 3, justifyContent: 'center' }}>
            <OrionTekLogo size={42} />
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                background: gradients.brand,
                color: '#FFFFFF',
                display: 'flex',
              }}
            >
              <LockOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
              Iniciar sesión
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Ingresá tus credenciales para acceder al panel.
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                disabled={loading}
                autoComplete="email"
                autoFocus
              />
              <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                disabled={loading}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        size="small"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<LoginIcon />}
                sx={{ mt: 1, py: 1.25 }}
              >
                {loading ? 'Verificando...' : 'Entrar'}
              </Button>
            </Stack>
          </Box>

        </Paper>
      </Box>
    </Box>
  );
};
