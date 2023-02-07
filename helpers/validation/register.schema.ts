import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  firstName: yup.string().required('First name field is empty'),
  lastName: yup.string().required('Last name field is empty'),
  email: yup.string().required('Email field is empty'),
  gender: yup.object().shape({
    label: yup.string().required('Gender field is empty'),
    value: yup.string().required('Gender field is empty'),
  }),
  countryCode: yup.object().shape({
    label: yup.string().required('Country field is empty'),
    value: yup.string().required('Country field is empty'),
  }),
  mobile: yup.string().required('Mobile field is empty'),
  password: yup
    .string()
    .required('Password field is empty')
    .min(3, 'Must be more than 3 characters')
    .max(12, 'must not exceed 12 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      'At least a capital, small letter, & special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password field is empty')
    .min(3, 'Must be more than 3 characters')
    .max(12, 'must not exceed 12 characters')
    .oneOf(
      [yup.ref('password'), null],
      'Passwords do not match. Please recheck.'
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      'At least a capital, small letter, & special character'
    ),
});

export default RegisterSchema;
