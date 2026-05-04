import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import {
  clearSelectedClient,
  createClient,
  fetchClientById,
  updateClient,
} from '../../store/slices/clientsSlice';
import { CreateClientDTO } from '../../types';

import { ClientForm } from './components/ClientForm';

export const ClientFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { selectedClient, detailStatus } = useAppSelector((s) => s.clients);

  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      dispatch(fetchClientById(id));
    }
    return () => {
      dispatch(clearSelectedClient());
    };
  }, [dispatch, id]);

  const handleSubmit = async (data: CreateClientDTO) => {
    setSubmitting(true);
    try {
      if (isEdit && id) {
        await dispatch(updateClient({ id, changes: data })).unwrap();
        notify('Cliente actualizado correctamente', 'success');
      } else {
        await dispatch(createClient(data)).unwrap();
        notify('Cliente creado correctamente', 'success');
      }
      navigate('/clients');
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && detailStatus === 'loading') {
    return (
      <Box>
        <Skeleton variant="text" width={120} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="40%" height={48} />
        <Skeleton variant="text" width="60%" sx={{ mb: 4 }} />
        <Paper sx={{ p: { xs: 2, sm: 4 } }}>
          <Stack spacing={2}>
            {[0, 1].map((row) => (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} key={row}>
                <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
                <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
              </Stack>
            ))}
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Skeleton variant="rounded" width={100} height={36} />
              <Skeleton variant="rounded" width={140} height={36} />
            </Stack>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (isEdit && !selectedClient) {
    return (
      <Box>
        <Typography variant="h4">Cliente no encontrado</Typography>
        <Button onClick={() => navigate('/clients')} sx={{ mt: 2 }}>
          Volver al listado
        </Button>
      </Box>
    );
  }

  const initialValues: CreateClientDTO | undefined = selectedClient
    ? {
        name: selectedClient.name,
        email: selectedClient.email,
        phone: selectedClient.phone,
        document: selectedClient.document,
      }
    : undefined;

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(isEdit && id ? `/clients/${id}` : '/clients')}
        >
          Volver
        </Button>
      </Stack>

      <Typography variant="h2" gutterBottom>
        {isEdit ? 'Editar cliente' : 'Nuevo cliente'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {isEdit
          ? 'Actualizá los datos del cliente.'
          : 'Completá los datos para registrar un nuevo cliente. Las direcciones se agregan después desde el detalle.'}
      </Typography>

      <Paper sx={{ p: { xs: 2, sm: 4 } }}>
        <ClientForm
          initialValues={initialValues}
          mode={isEdit ? 'edit' : 'create'}
          loading={submitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate(isEdit && id ? `/clients/${id}` : '/clients')}
        />
      </Paper>
    </Box>
  );
};
