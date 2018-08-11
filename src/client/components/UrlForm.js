import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import { withFormik } from '../../../node_modules/formik';
import DisplayFormikState from './DisplayFormikState';

const SubmitButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
  &:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`;

const ErrorLabel = styled.span`
  display: inline-block;
`;

// .btn-outline-primary {
//   color: #007bff;
//   background-color: transparent;
//   background-image: none;
//   border-color: #007bff;
// }
// .btn {
//   display: inline-block;
//   font-weight: 400;
//   text-align: center;
//   white-space: nowrap;
//   vertical-align: middle;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   border: 1px solid transparent;
//   padding: .5rem .75rem;
//   font-size: 1rem;
//   line-height: 1.25;
//   border-radius: .25rem;
//   transition: all .15s ease-in-out;
// }

const UriForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    hanldeBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <form className="" onSubmit={handleSubmit}>
      <h1>
URI Shortener
      </h1>
      <div>
        <label htmlFor="uri">
Link Address
        </label>
        <input
          name="uri"
          type="text"
          className={`form-control ${errors.uri && touched.uri && 'is-invalid'}`}
          value={values.uri}
          onChange={handleChange}
          // onBlur={_handleBlur}
        />
        {errors.uri && touched.uri && (
        <div className="invalid-feedback">
          {errors.uri}
        </div>
        )}
      </div>
      <button type="submit" className="btn btn-outline-primary">
        {isSubmitting ? 'WAIT PLZ' : 'SUBMIT'}
      </button>
      <SubmitButton type="submit">
        {isSubmitting ? 'WAIT PLZ' : 'ALSO SUBMIT'}
      </SubmitButton>
      <DisplayFormikState {...props} />
    </form>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    uri: props.uri.uri
  }),

  validationSchema: Yup.object().shape({
    uri: Yup.string()
      .url('Invalid URI format')
      .required('A valid link is required')

      .test(
        'is-google',
      <ErrorLabel>
Uhhh this isn't google
      </ErrorLabel>,
      value => value === 'http://www.google.com'
      )
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      JSON.stringify(values, null, 2);
      setSubmitting(false);
    }, 1000);
  }
})(UriForm);
