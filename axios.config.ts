import axios, { AxiosInstance } from 'axios';

export const interceptor: AxiosInstance = axios.create({
  baseURL: `${
    process.env.environment === 'production'
      ? process.env.apiStaging
      : process.env.apiLocal
  }`,
});
