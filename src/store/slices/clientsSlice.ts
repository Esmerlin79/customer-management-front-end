import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clientsService, ListClientsParams } from '../../services/clientsService';
import {
  Client,
  CreateClientDTO,
  LoadingStatus,
  UpdateClientDTO,
} from '../../types';

import { updateAddress, createAddress, deleteAddress } from './addressesSlice';

interface ClientsState {
  items: Client[];
  selectedClient: Client | null;
  total: number;
  page: number;
  totalPages: number;
  status: LoadingStatus;
  detailStatus: LoadingStatus;
  error: string | null;
  searchFilter: string;
}

const initialState: ClientsState = {
  items: [],
  selectedClient: null,
  total: 0,
  page: 1,
  totalPages: 0,
  status: 'idle',
  detailStatus: 'idle',
  error: null,
  searchFilter: '',
};

export const fetchClients = createAsyncThunk(
  'clients/fetch',
  async (params: ListClientsParams = {}) => {
    return await clientsService.list(params);
  }
);

export const fetchClientById = createAsyncThunk(
  'clients/fetchById',
  async (id: string) => {
    return await clientsService.get(id);
  }
);

export const createClient = createAsyncThunk(
  'clients/create',
  async (client: CreateClientDTO) => {
    return await clientsService.create(client);
  }
);

export const updateClient = createAsyncThunk(
  'clients/update',
  async ({ id, changes }: { id: string; changes: UpdateClientDTO }) => {
    return await clientsService.update(id, changes);
  }
);

export const deleteClient = createAsyncThunk(
  'clients/delete',
  async (id: string) => {
    await clientsService.remove(id);
    return id;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    clearSelectedClient: (state) => {
      state.selectedClient = null;
      state.detailStatus = 'idle';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Error al cargar clientes';
      })

      .addCase(fetchClientById.pending, (state) => {
        state.detailStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.detailStatus = 'success';
        state.selectedClient = action.payload;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.detailStatus = 'error';
        state.error = action.error.message ?? 'Error al cargar el cliente';
      })

      .addCase(createClient.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error al crear el cliente';
      })

      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...action.payload,
            addresses: state.items[index].addresses,
          };
        }
        if (state.selectedClient?.id === action.payload.id) {
          state.selectedClient = {
            ...action.payload,
            addresses: state.selectedClient.addresses,
          };
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error al actualizar el cliente';
      })

      .addCase(deleteClient.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
        state.total -= 1;
        if (state.selectedClient?.id === action.payload) {
          state.selectedClient = null;
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error al eliminar el cliente';
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        const address = action.payload;
        if (state.selectedClient?.id === address.clientId) {
          if (address.isPrimary) {
            state.selectedClient.addresses.forEach((a) => (a.isPrimary = false));
          }
          state.selectedClient.addresses.push(address);
        }
        const client = state.items.find((c) => c.id === address.clientId);
        if (client) {
          if (address.isPrimary) {
            client.addresses.forEach((a) => (a.isPrimary = false));
          }
          client.addresses.push(address);
        }
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const address = action.payload;
        const sync = (list: Client[]) => {
          const client = list.find((c) => c.id === address.clientId);
          if (!client) return;
          if (address.isPrimary) {
            client.addresses.forEach((a) => (a.isPrimary = a.id === address.id));
          }
          const index = client.addresses.findIndex((a) => a.id === address.id);
          if (index !== -1) client.addresses[index] = address;
        };
        sync(state.items);
        if (state.selectedClient) sync([state.selectedClient]);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const removedId = action.payload;
        const sync = (client: Client) => {
          const index = client.addresses.findIndex((a) => a.id === removedId);
          if (index === -1) return;
          const wasPrimary = client.addresses[index].isPrimary;
          client.addresses.splice(index, 1);
          if (wasPrimary && client.addresses.length > 0) {
            client.addresses[0].isPrimary = true;
          }
        };
        state.items.forEach(sync);
        if (state.selectedClient) sync(state.selectedClient);
      });
  },
});

export const { setSearchFilter, clearSelectedClient, clearError } = clientsSlice.actions;
export default clientsSlice.reducer;
