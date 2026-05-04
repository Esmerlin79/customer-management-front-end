import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import {
  clearSelectedClient,
  fetchClientById,
} from '../../store/slices/clientsSlice';
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from '../../store/slices/addressesSlice';
import { Address, CreateAddressDTO } from '../../types';

import { AddressForm } from './components/AddressForm';
import { AddressItem } from './components/AddressItem';
import { ClientDetailSkeleton } from './components/ClientDetailSkeleton';

export const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { selectedClient, detailStatus } = useAppSelector((s) => s.clients);
  const addressLoading = useAppSelector((s) => s.addresses.status === 'loading');

  const [modal, setModal] = useState<
    { type: 'closed' } | { type: 'create' } | { type: 'edit'; address: Address }
  >({ type: 'closed' });
  const [toDelete, setToDelete] = useState<Address | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchClientById(id));
    }
    return () => {
      dispatch(clearSelectedClient());
    };
  }, [dispatch, id]);

  const handleSaveAddress = async (data: CreateAddressDTO) => {
    if (!id) return;
    try {
      if (modal.type === 'edit') {
        await dispatch(
          updateAddress({ id: modal.address.id, changes: data })
        ).unwrap();
        notify('Dirección actualizada', 'success');
      } else {
        await dispatch(createAddress({ clientId: id, address: data })).unwrap();
        notify('Dirección agregada', 'success');
      }
      setModal({ type: 'closed' });
    } catch (err) {
      notify((err as Error).message, 'error');
    }
  };

  const confirmDeleteAddress = async () => {
    if (!toDelete) return;
    try {
      await dispatch(
        deleteAddress({ id: toDelete.id, clientId: toDelete.clientId })
      ).unwrap();
      notify('Dirección eliminada', 'success');
      setToDelete(null);
    } catch (err) {
      notify((err as Error).message, 'error');
    }
  };

  const handleEditAddress = useCallback((address: Address) => {
    setModal({ type: 'edit', address });
  }, []);

  const handleDeleteAddress = useCallback((address: Address) => {
    setToDelete(address);
  }, []);

  if (detailStatus === 'loading') {
    return <ClientDetailSkeleton />;
  }

  if (!selectedClient) {
    return (
      <Box>
        <Typography variant="h4">Cliente no encontrado</Typography>
        <Button onClick={() => navigate('/clients')} sx={{ mt: 2 }}>
          Volver al listado
        </Button>
      </Box>
    );
  }

  const client = selectedClient;

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/clients')}>
          Volver
        </Button>
      </Stack>

      <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Typography variant="h2">{client.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              Documento: {client.document}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/clients/${client.id}/edit`)}
          >
            Editar datos
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{client.email}</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Teléfono
                </Typography>
                <Typography variant="body1">{client.phone}</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: { xs: 2, sm: 4 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h3">Direcciones</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModal({ type: 'create' })}
          >
            Agregar dirección
          </Button>
        </Stack>

        {client.addresses.length === 0 ? (
          <EmptyState
            icon={<LocationOffIcon sx={{ fontSize: 56, opacity: 0.5, mb: 2 }} />}
            title="Este cliente no tiene direcciones"
            description="Agregá la primera dirección desde el botón de arriba."
          />
        ) : (
          <List sx={{ pt: 0 }}>
            {client.addresses.map((a) => (
              <AddressItem
                key={a.id}
                address={a}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
              />
            ))}
          </List>
        )}
      </Paper>

      <Dialog
        open={modal.type !== 'closed'}
        onClose={() => setModal({ type: 'closed' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {modal.type === 'edit' ? 'Editar dirección' : 'Nueva dirección'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <AddressForm
              initialValues={
                modal.type === 'edit'
                  ? {
                      street: modal.address.street,
                      city: modal.address.city,
                      state: modal.address.state,
                      zipCode: modal.address.zipCode,
                      country: modal.address.country,
                      isPrimary: modal.address.isPrimary,
                    }
                  : undefined
              }
              mode={modal.type === 'edit' ? 'edit' : 'create'}
              loading={addressLoading}
              onSubmit={handleSaveAddress}
              onCancel={() => setModal({ type: 'closed' })}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar dirección"
        message={
          toDelete
            ? `¿Eliminar la dirección "${toDelete.street}, ${toDelete.city}"?`
            : ''
        }
        confirmLabel="Eliminar"
        onConfirm={confirmDeleteAddress}
        onCancel={() => setToDelete(null)}
      />
    </Box>
  );
};
