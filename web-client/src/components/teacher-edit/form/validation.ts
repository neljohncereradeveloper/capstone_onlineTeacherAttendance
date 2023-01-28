import * as Yup from 'yup';

export const TeacherEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'length must be greater than 2')
    .max(50, 'length must not be greater than 20')
    .matches(/^[aA-zZ\s]+$/, 'should only be letters')
    .required('required field'),
  idNumber: Yup.string()
    .min(3, 'length must be greater than 3')
    .max(20, 'length must not be greater than 20')
    .matches(/^[a-zA-Z0-9]+$/, 'should only be letters and numbers')
    .required('required field'),
  birthDate: Yup.date()
    .max(new Date(), 'Future days not allowed')
    .required('Required field'),
});
