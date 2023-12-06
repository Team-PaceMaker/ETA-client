import axios from 'axios';

export const defaultServer = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

export const formDataServer = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Server Setting
defaultServer.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
