import React from 'react';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

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

export const PasswordResetRequestPage = () => {
  return (
    <div className="box">
      <h1 className="title">Password Reset Request</h1>

      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values) => {
          console.log('Password reset request:', values);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
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
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.email}
              >
                Send Reset Link
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};