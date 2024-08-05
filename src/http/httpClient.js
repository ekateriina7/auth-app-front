import { createClient } from './index.js';
import { authService } from '../services/authService.js';
import { accessTokenService } from '../services/accessTokenService.js';

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request) {
  const accessToken = accessTokenService.get();
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}

function onResponseSuccess(response) {
  return response.data;
}

async function onResponseError(error) {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const { accessToken } = await authService.refresh();
      accessTokenService.save(accessToken);

      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return httpClient(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
}