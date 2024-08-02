import React from 'react';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

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
  return (
    <div className="box">
      <h1 className="title">Profile Page</h1>

      <Formik
        initialValues={{
          name: '',
          email: '',
          currentPassword: '',
          newPassword: '',
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          setSubmitting(false);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="field">
              <label htmlFor="name" className="label">
                Name
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
              {touched.name && errors.name && (
                <p className="help is-danger">{errors.name}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="email" className="label">
                Email
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
              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>

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
              {touched.currentPassword && errors.currentPassword && (
                <p className="help is-danger">{errors.currentPassword}</p>
              )}
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
              {touched.newPassword && errors.newPassword && (
                <p className="help is-danger">{errors.newPassword}</p>
              )}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={
                  isSubmitting ||
                  errors.name ||
                  errors.email ||
                  errors.currentPassword ||
                  errors.newPassword
                }
              >
                Update Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};