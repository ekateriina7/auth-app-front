import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { userService } from '../services/userService.js';
import { usePageError } from '../hooks/usePageError.js';

const validateName = (value) => {
  if (!value) {
    return 'Name is required';
  }
  if (value.length < 2) {
    return 'Name should be at least 2 characters';
  }
  return undefined;
};

const validateEmail = (value) => {
  if (!value) {
    return 'Email is required';
  }
  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;
  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
  return undefined;
};

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }
  if (value.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return undefined;
};

export const ProfilePage = () => {
  const [submissionError, setSubmissionError] = usePageError('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (submitFn) => {
    try {
      await submitFn();
      setSuccessMessage('Profile updated successfully.');
    } catch (error) {
      setSubmissionError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="box">
      <h1 className="title">Profile Page</h1>

      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setSuccessMessage('');
          handleSubmit(() => userService.updateName(values.name));
          setSubmitting(false);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="field">
              <label htmlFor="name" className="label">
                Update Name
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateName}
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className={cn('input', {
                    'is-danger': touched.name && errors.name,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>
                {touched.name && errors.name && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.name && errors.name && <p className="help is-danger">{errors.name}</p>}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.name}
              >
                Update Name
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setSuccessMessage('');
          try {
            await userService.updateEmail({ newEmail: values.email, password: values.password });
            setSuccessMessage('Email updated successfully.');
            setSubmissionError('');
          } catch (error) {
            setSubmissionError(error.response?.data?.message || 'Failed to update email');
          }
          setSubmitting(false);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="field">
              <label htmlFor="email" className="label">
                Update Email
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.email && errors.email && <p className="help is-danger">{errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.password && errors.password && <p className="help is-danger">{errors.password}</p>}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.email || errors.password}
              >
                Update Email
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmation: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setSuccessMessage('');
          if (values.newPassword !== values.confirmation) {
            setSubmissionError('Passwords do not match');
            setSubmitting(false);
            return;
          }
          handleSubmit(() => userService.updatePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmation: values.confirmation,
          }));
          setSubmitting(false);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="field">
              <label htmlFor="currentPassword" className="label">
                Current Password
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="currentPassword"
                  type="password"
                  id="currentPassword"
                  placeholder="Current password"
                  className={cn('input', {
                    'is-danger': touched.currentPassword && errors.currentPassword,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
                {touched.currentPassword && errors.currentPassword && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.currentPassword && errors.currentPassword && <p className="help is-danger">{errors.currentPassword}</p>}
            </div>

            <div className="field">
              <label htmlFor="newPassword" className="label">
                New Password
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="newPassword"
                  type="password"
                  id="newPassword"
                  placeholder="New password"
                  className={cn('input', {
                    'is-danger': touched.newPassword && errors.newPassword,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
                {touched.newPassword && errors.newPassword && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.newPassword && errors.newPassword && <p className="help is-danger">{errors.newPassword}</p>}
            </div>

            <div className="field">
              <label htmlFor="confirmation" className="label">
                Confirm New Password
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={(value) =>
                    value !== document.getElementById('newPassword').value ? 'Passwords do not match' : undefined
                  }
                  name="confirmation"
                  type="password"
                  id="confirmation"
                  placeholder="Confirm new password"
                  className={cn('input', {
                    'is-danger': touched.confirmation && errors.confirmation,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
                {touched.confirmation && errors.confirmation && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.confirmation && errors.confirmation && <p className="help is-danger">{errors.confirmation}</p>}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.currentPassword || errors.newPassword || errors.confirmation}
              >
                Update Password
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {submissionError && <p className="notification is-danger">{submissionError}</p>}
      {successMessage && <p className="notification is-success">{successMessage}</p>}
    </div>
  );
};
