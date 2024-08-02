import React from 'react';
import { Link } from 'react-router-dom';

export const PasswordResetSuccessPage = () => {
  return (
    <div className="box">
      <h1 className="title">Password Reset Successful</h1>
      <p>Your password has been reset successfully.</p>
      <Link to="/login">
        Go to Login
      </Link>
    </div>
  );
};