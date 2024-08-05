import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { authService } from '../services/authService.js';
import { usePageError } from '../hooks/usePageError.js';

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }
  if (value.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return undefined;
};

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [submissionError, setSubmissionError] = usePageError('');


  return (
    <div className="box">
      <h1 className="title">Reset Password</h1>

      <Formik
        initialValues={{
          password: '',
          confirmation: '',
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          setSubmissionError('');

          if (values.password !== values.confirmation) {
            setFieldError('confirmation', 'Passwords do not match');
            setSubmitting(false);
            return;
          }

          try {
            await authService.resetPassword(resetToken, values.password);
            navigate('/reset-success');
          } catch (error) {
            setSubmissionError(
              error.response?.data?.message || 'Password reset failed'
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting, values }) => (
          <Form>
            <div className="field">
              <label htmlFor="password" className="label">
                New Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="New password"
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

              {touched.password && errors.password && (
                <p className="help is-danger">{errors.password}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmation" className="label">
                Confirm Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={(value) =>
                    value !== values.password ? 'Passwords do not match' : undefined
                  }
                  name="confirmation"
                  type="password"
                  id="confirmation"
                  placeholder="Confirm password"
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

              {touched.confirmation && errors.confirmation && (
                <p className="help is-danger">{errors.confirmation}</p>
              )}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.password || errors.confirmation}
              >
                Reset Password
              </button>
            </div>

            {submissionError && (
              <p className="notification is-danger">{submissionError}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};