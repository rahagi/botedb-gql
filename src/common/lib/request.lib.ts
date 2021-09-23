import axios, { AxiosInstance } from 'axios';
import { ISetupCache, setupCache } from 'axios-cache-adapter';

const cache: ISetupCache = setupCache({
  maxAge: 60 * 60 * 1000,
  limit: 20,
});

const request: AxiosInstance = axios.create({
  adapter: cache.adapter,
  headers: {
    'User-Agent': 'botedb-gql-crawler',
    'Content-Type': 'charset=utf-8',
  },
});

export default request;
