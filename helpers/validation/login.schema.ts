import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email field is required'),
  password: yup
    .string()
    .required('Password field is empty')
    .min(3, 'Min. 3 characters')
    .max(12, 'Max. 12 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      'At least a capital, small letter, & special character'
    ),
});

export default LoginSchema;
