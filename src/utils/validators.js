import * as yup from 'yup';

export const caseSchema = yup.object().shape({
  caseNumber: yup.string().required('Case number is required'),
  caseType: yup.string().required('Case type is required'),
  jurisdiction: yup.string().required('Jurisdiction is required'),
  filingDate: yup.date().required('Filing date is required'),
  description: yup.string().required('Description is required'),
});

export const partySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  contact: yup.string()
    .matches(/^\+27\d{9}$/, 'Invalid South African phone number')
    .required('Contact number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
}); 