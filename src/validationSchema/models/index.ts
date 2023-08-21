import * as yup from 'yup';

export const modelValidationSchema = yup.object().shape({
  name: yup.string().required(),
  active: yup.boolean().nullable(),
});
