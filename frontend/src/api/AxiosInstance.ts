import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const $apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default $apiInstance;
