import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'length must be greater than 2')
    .max(20, 'length must not be greater than 20')
    .required('required field'),
  password: Yup.string()
    .min(2, 'length must be greater than 2')
    .max(20, 'length must not be greater than 20')
    .required('required field'),
});
