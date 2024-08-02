import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss';

import { AccountActivationPage } from './pages/AccountActivationPage';
import { AuthContext } from './components/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RequireAuth } from './components/RequireAuth';
import { UsersPage } from './pages/UsersPage';
import { Loader } from './components/Loader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { usePageError } from './hooks/usePageError.js';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { ResetPasswordPage } from './pages/ResetPasswordPage.jsx';
import { PasswordResetRequestPage } from './pages/PasswordResetRequestPage.jsx';
import { PasswordResetSuccessPage } from './pages/PasswordResetSuccessPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function App() {
  const navigate = useNavigate();
  const [error, setError] = usePageError();
  const { isChecked, user, logout, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />
  }

  return (
    <>
      <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>

          <NavLink to="/users" className="navbar-item">
            Users
          </NavLink>

          {user && (
            <NavLink to="/profile" className="navbar-item">
              Profile
            </NavLink>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button
                  className="button is-light has-text-weight-bold"
                  onClick={() => {
                    logout()
                      .then(() => {
                        navigate('/login');
                      })
                      .catch((error) => {
                        setError(error.response?.data?.message);
                      });
                  }}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link to="/sign-up" className="button is-light has-text-weight-bold">
                    Sign up
                  </Link>

                  <Link to="/login" className="button is-success has-text-weight-bold">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="section">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route path="activate/:activationToken" element={<AccountActivationPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route path="/" element={<RequireAuth />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="reset-password" element={<PasswordResetRequestPage />} />
            <Route path="reset-password/:resetToken" element={<ResetPasswordPage />} />
            <Route path="reset-success" element={<PasswordResetSuccessPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>

        {error && <p className="notification is-danger is-light">{error}</p>}
      </main>
    </>
  );
}

export default App;