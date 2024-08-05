import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService.js';
import { authService } from '../services/authService.js';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  async function activate(activationToken) {
    try {
      const { accessToken, user } = await authService.activate(activationToken);
      console.log(accessToken)

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Activation failed');
    }
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      setAuthError('User is not authenticated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }) {
    try {
      const { accessToken, user } = await authService.login({ email, password });

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Login failed');
    }
  }

  async function logout() {
    try {
      await authService.logout();

      accessTokenService.remove();
      setUser(null);
    } catch (error) {
      setAuthError('Logout failed');
    }
  }

  async function resetPassword(resetToken, newPassword) {
    try {
      await authService.resetPassword(resetToken, newPassword);

      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Password reset failed');
    }
  }

  const value = useMemo(() => ({
    isChecked,
    user,
    authError,
    checkAuth,
    activate,
    login,
    logout,
    resetPassword,
  }), [user, isChecked, authError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};