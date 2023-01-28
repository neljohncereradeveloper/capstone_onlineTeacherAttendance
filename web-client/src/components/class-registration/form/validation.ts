import * as Yup from 'yup';

export const ClassRegistrationSchema = Yup.object().shape({
  classRoom: Yup.string()
    .min(3, 'length must be greater than 2')
    .max(50, 'length must not be greater than 20')
    .required('required field'),
  teacher: Yup.string()
    .min(3, 'length must be greater than 2')
    .max(50, 'length must not be greater than 20')
    .required('required field'),
  idNumber: Yup.string()
    .min(3, 'length must be greater than 3')
    .max(20, 'length must not be greater than 20')
    .required('required field'),
  subject: Yup.string()
    .min(3, 'length must be greater than 2')
    .max(50, 'length must not be greater than 20')
    .required('required field'),
  year: Yup.string()
    .min(3, 'length must be greater than 3')
    .max(20, 'length must not be greater than 20')
    .required('required field'),
});
