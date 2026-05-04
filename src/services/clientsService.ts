import {
  Client,
  CreateClientDTO,
  PaginatedResponse,
  UpdateClientDTO,
} from '../types';

import { apiClient } from './apiClient';

export interface ListClientsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const clientsService = {
  async list(params: ListClientsParams = {}): Promise<PaginatedResponse<Client>> {
    const { data } = await apiClient.get<PaginatedResponse<Client>>('/clients', { params });
    return data;
  },

  async get(id: string): Promise<Client> {
    const { data } = await apiClient.get<Client>(`/clients/${id}`);
    return data;
  },

  async create(client: CreateClientDTO): Promise<Client> {
    const { data } = await apiClient.post<Client>('/clients', client);
    return data;
  },

  async update(id: string, changes: UpdateClientDTO): Promise<Client> {
    const { data } = await apiClient.put<Client>(`/clients/${id}`, changes);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/clients/${id}`);
  },
};
