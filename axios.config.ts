import axios, { AxiosInstance } from 'axios';

export const interceptor: AxiosInstance = axios.create({
  // baseURL: 'https://aacls-web-app.azurewebsites.net',
  baseURL: 'http://127.0.0.1:3000/v1',
});
