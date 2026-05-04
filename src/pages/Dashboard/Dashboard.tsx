import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchClients } from '../../store/slices/clientsSlice';
import { colors, gradients } from '../../theme';

import { AddressesByCountryChart } from './components/AddressesByCountryChart';
import { ClientsPerMonthChart } from './components/ClientsPerMonthChart';
import { KPICard } from './components/KPICard';
import { TopClientsChart } from './components/TopClientsChart';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total, status } = useAppSelector((s) => s.clients);

  useEffect(() => {
    dispatch(fetchClients({ limit: 100 }));
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalAddresses = items.reduce((acc, c) => acc + c.addresses.length, 0);
    const withPrimary = items.filter((c) =>
      c.addresses.some((a) => a.isPrimary)
    ).length;
    const countries = new Set<string>();
    items.forEach((c) => c.addresses.forEach((a) => countries.add(a.country)));
    return {
      totalAddresses,
      withPrimary,
      uniqueCountries: countries.size,
    };
  }, [items]);

  const initialLoading = status === 'loading' && items.length === 0;

  const cards = [
    {
      title: 'Clientes totales',
      value: total,
      icon: <PeopleIcon />,
      gradient: gradients.primary,
      onClick: () => navigate('/clients'),
    },
    {
      title: 'Direcciones registradas',
      value: stats.totalAddresses,
      icon: <LocationOnIcon />,
      gradient: gradients.secondary,
    },
    {
      title: 'Países cubiertos',
      value: stats.uniqueCountries,
      icon: <PublicIcon />,
      gradient: gradients.navy,
    },
    {
      title: 'Con dirección principal',
      value: stats.withPrimary,
      icon: <StarIcon />,
      gradient: gradients.success,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Panel de control
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Resumen del sistema de gestión de clientes de OrionTek.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {initialLoading
          ? [0, 1, 2, 3].map((i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Skeleton variant="rounded" width={48} height={48} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width={60} height={36} />
                        <Skeleton variant="text" width="80%" />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : cards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.title}>
                <KPICard {...card} />
              </Grid>
            ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 320, border: `1px solid ${colors.border}` }}>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="h4">Clientes registrados por mes</Typography>
              <Typography variant="caption" color="text.secondary">
                Evolución basada en la fecha de creación.
              </Typography>
            </Stack>
            <Box sx={{ height: 230 }}>
              {initialLoading ? (
                <Skeleton variant="rounded" height="100%" />
              ) : (
                <ClientsPerMonthChart clients={items} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 320, border: `1px solid ${colors.border}` }}>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="h4">Direcciones por país</Typography>
              <Typography variant="caption" color="text.secondary">
                Distribución geográfica.
              </Typography>
            </Stack>
            <Box sx={{ height: 230 }}>
              {initialLoading ? (
                <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto' }} />
              ) : (
                <AddressesByCountryChart clients={items} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, border: `1px solid ${colors.border}` }}>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="h4">Top clientes por cantidad de direcciones</Typography>
              <Typography variant="caption" color="text.secondary">
                Los 5 con mayor cobertura geográfica.
              </Typography>
            </Stack>
            <Box sx={{ height: 240 }}>
              {initialLoading ? (
                <Skeleton variant="rounded" height="100%" />
              ) : (
                <TopClientsChart clients={items} />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
