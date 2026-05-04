import axios, { AxiosError, AxiosInstance } from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:4000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let getToken: () => string | null = () => null;
let onLogout: () => void = () => {};

export const configureAuth = (
  tokenGetter: () => string | null,
  logoutHandler: () => void
) => {
  getToken = tokenGetter;
  onLogout = logoutHandler;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string }>) => {
    if (error.response?.status === 401) {
      if (!error.config?.url?.includes('/auth/login')) {
        onLogout();
      }
    }
    const message =
      error.response?.data?.error ||
      error.message ||
      'Error de conexión con el servidor';
    return Promise.reject(new Error(message));
  }
);
