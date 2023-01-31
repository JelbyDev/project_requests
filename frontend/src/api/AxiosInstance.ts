import axios from 'axios';

const API_URL = 'http://localhost:5000';

const $apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default $apiInstance;
