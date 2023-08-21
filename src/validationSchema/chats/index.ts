import * as yup from 'yup';

export const chatValidationSchema = yup.object().shape({
  title: yup.string().required(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
  role_id: yup.string().nullable().required(),
  model_id: yup.string().nullable().required(),
});
