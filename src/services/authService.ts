import { LoginCredentials, LoginResponse, PublicUser } from '../types';

import { apiClient } from './apiClient';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return data;
  },

  async me(): Promise<PublicUser> {
    const { data } = await apiClient.get<{ user: PublicUser }>('/auth/me');
    return data.user;
  },
};
