import { httpClient } from '../http/httpClient.js';

function getAll() {
  return httpClient.get('/users')
}

function updateProfile({ name, email, currentPassword, newPassword }) {
  return httpClient.put('/profile', { name, email, currentPassword, newPassword });
}

export const userService = {
  getAll,
  updateProfile,
};

