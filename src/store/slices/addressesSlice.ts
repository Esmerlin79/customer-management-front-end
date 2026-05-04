import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addressesService } from '../../services/addressesService';
import {
  Address,
  CreateAddressDTO,
  LoadingStatus,
  UpdateAddressDTO,
} from '../../types';

interface AddressesState {
  status: LoadingStatus;
  error: string | null;
}

const initialState: AddressesState = {
  status: 'idle',
  error: null,
};

export const createAddress = createAsyncThunk(
  'addresses/create',
  async ({
    clientId,
    address,
  }: {
    clientId: string;
    address: CreateAddressDTO;
  }) => {
    return await addressesService.create(clientId, address);
  }
);

export const updateAddress = createAsyncThunk(
  'addresses/update',
  async ({ id, changes }: { id: string; changes: UpdateAddressDTO }) => {
    return await addressesService.update(id, changes);
  }
);

export const deleteAddress = createAsyncThunk(
  'addresses/delete',
  async ({ id }: { id: string; clientId: string }) => {
    await addressesService.remove(id);
    return id;
  }
);

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state: AddressesState) => {
      state.status = 'loading';
      state.error = null;
    };
    const setSuccess = (state: AddressesState) => {
      state.status = 'success';
    };
    const setError = (state: AddressesState, action: { error: { message?: string } }) => {
      state.status = 'error';
      state.error = action.error.message ?? 'Error en operación de dirección';
    };

    builder
      .addCase(createAddress.pending, setLoading)
      .addCase(createAddress.fulfilled, setSuccess)
      .addCase(createAddress.rejected, setError)

      .addCase(updateAddress.pending, setLoading)
      .addCase(updateAddress.fulfilled, setSuccess)
      .addCase(updateAddress.rejected, setError)

      .addCase(deleteAddress.pending, setLoading)
      .addCase(deleteAddress.fulfilled, setSuccess)
      .addCase(deleteAddress.rejected, setError);
  },
});

export const { clearAddressError } = addressesSlice.actions;
export default addressesSlice.reducer;

export type { Address };
