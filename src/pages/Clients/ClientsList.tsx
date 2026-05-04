import AddIcon from '@mui/icons-material/Add';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDebounce } from '../../hooks/useDebounce';
import { useNotification } from '../../hooks/useNotification';
import {
  deleteClient,
  fetchClients,
  setSearchFilter,
} from '../../store/slices/clientsSlice';
import { Client } from '../../types';

import { ClientCard } from './components/ClientCard';
import { ClientCardSkeleton } from './components/ClientCardSkeleton';

const PAGE_LIMIT = 6;

export const ClientsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { items, total, page, totalPages, status, searchFilter } =
    useAppSelector((s) => s.clients);

  const [searchTerm, setSearchTerm] = useState(searchFilter);
  const deferredTerm = useDeferredValue(searchTerm);
  const debouncedTerm = useDebounce(searchTerm, 350);

  const [isPending, startTransition] = useTransition();
  const [localPage, setLocalPage] = useState(1);
  const [toDelete, setToDelete] = useState<Client | null>(null);

  useEffect(() => {
    startTransition(() => {
      dispatch(setSearchFilter(debouncedTerm));
      setLocalPage(1);
    });
  }, [debouncedTerm, dispatch]);

  useEffect(() => {
    dispatch(
      fetchClients({
        search: searchFilter,
        page: localPage,
        limit: PAGE_LIMIT,
      })
    );
  }, [dispatch, searchFilter, localPage]);

  const handleDelete = useCallback((client: Client) => {
    setToDelete(client);
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await dispatch(deleteClient(toDelete.id)).unwrap();
      notify(`Cliente "${toDelete.name}" eliminado`, 'success');
      setToDelete(null);
    } catch (err) {
      notify((err as Error).message, 'error');
    }
  };

  const initialLoading = status === 'loading' && items.length === 0;
  const gridOpacity = isPending ? 0.6 : 1;

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h2">Clientes</Typography>
          <Typography variant="body2" color="text.secondary">
            {total} cliente{total === 1 ? '' : 's'} en total
            {deferredTerm && deferredTerm === searchFilter && (
              <> · resultados para &ldquo;{deferredTerm}&rdquo;</>
            )}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/clients/new')}
        >
          Nuevo cliente
        </Button>
      </Stack>

      <TextField
        placeholder="Buscar por nombre, email o documento..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {initialLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ClientCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<PeopleOutlineIcon sx={{ fontSize: 64, opacity: 0.5, mb: 2 }} />}
          title={searchFilter ? 'Sin resultados' : 'No hay clientes todavía'}
          description={
            searchFilter
              ? 'Probá con otra búsqueda o creá un nuevo cliente.'
              : 'Empezá agregando tu primer cliente al sistema.'
          }
          action={{
            label: 'Crear cliente',
            onClick: () => navigate('/clients/new'),
          }}
        />
      ) : (
        <>
          <Grid
            container
            spacing={3}
            sx={{ opacity: gridOpacity, transition: 'opacity 0.15s' }}
          >
            {items.map((client) => (
              <Grid item xs={12} sm={6} md={4} key={client.id}>
                <ClientCard client={client} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_e, p) => startTransition(() => setLocalPage(p))}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar cliente"
        message={
          toDelete
            ? `¿Estás seguro de eliminar a "${toDelete.name}"? Esta acción también borra sus direcciones y no se puede deshacer.`
            : ''
        }
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </Box>
  );
};
