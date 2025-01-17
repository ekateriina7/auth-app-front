import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3005',
    withCredentials: true,
  });
}
