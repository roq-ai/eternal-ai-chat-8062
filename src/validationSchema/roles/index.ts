import * as yup from 'yup';

export const roleValidationSchema = yup.object().shape({
  name: yup.string().nullable(),
  description: yup.string().nullable(),
  active: yup.boolean().nullable(),
});
