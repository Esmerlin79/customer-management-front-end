import { Address, CreateAddressDTO, UpdateAddressDTO } from '../types';

import { apiClient } from './apiClient';

export const addressesService = {
  async create(clientId: string, address: CreateAddressDTO): Promise<Address> {
    const { data } = await apiClient.post<Address>(
      `/clients/${clientId}/addresses`,
      address
    );
    return data;
  },

  async update(id: string, changes: UpdateAddressDTO): Promise<Address> {
    const { data } = await apiClient.put<Address>(`/addresses/${id}`, changes);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/addresses/${id}`);
  },
};
