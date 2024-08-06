import { httpClient } from '../http/httpClient.js';

function getAll() {
  return httpClient.get('/users');
}

function updateName(name) {
  return httpClient.patch('/users/profile/name', { name });
}

function updateEmail({ newEmail, password }) {
  return httpClient.patch('/users/profile/email', { newEmail, password });
}

function updatePassword({ oldPassword, newPassword, confirmation }) {
  return httpClient.patch('/users/profile/password', { oldPassword, newPassword, confirmation });
}

export const userService = {
  getAll,
  updateName,
  updateEmail,
  updatePassword,
};