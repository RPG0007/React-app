import * as yup from 'yup';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is a required field')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .required('Choose the gender, this is required'),
  country: yup.string().required('Country is a required field'),
  picture: yup
    .mixed()
    .required('Image is a required field')
    .test(
      'fileType',
      'Invalid file type, only JPEG and PNG are allowed',
      (value) => {
        const file = value as File;
        return !file || ['image/jpeg', 'image/png'].includes(file.type);
      }
    )
    .test('fileSize', 'File size is too large', (value) => {
      const file = value as File;
      return !file || file.size <= 1024 * 1024 * 2;
    }),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email format. Example: name@example.com')
    .email('Invalid email format. Example: name@example.com'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(/^(?=.*\d)/, 'Password must contain at least one number')
    .matches(
      /^(?=.*[\W_])/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  accept: yup.boolean().test({
    name: 'accepted',
    message: 'You must accept the terms and conditions',
    test: (value) => value === true,
  }),
});
