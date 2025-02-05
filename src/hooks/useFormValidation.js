import { useCallback, useState } from 'react';

export const useFormValidation = (validationSchema) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      if (!validationSchema[name]) return '';

      const fieldSchema = validationSchema[name];
      let error = '';

      if (fieldSchema.required && !value) {
        error = fieldSchema.required === true 
          ? 'This field is required' 
          : fieldSchema.required;
      } else if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
        error = fieldSchema.message || 'Invalid format';
      } else if (fieldSchema.validate) {
        error = fieldSchema.validate(value);
      }

      return error;
    },
    [validationSchema]
  );

  const validateForm = useCallback(
    (values) => {
      const newErrors = {};
      Object.keys(validationSchema).forEach((field) => {
        const error = validateField(field, values[field]);
        if (error) newErrors[field] = error;
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validationSchema, validateField]
  );

  const handleBlur = useCallback(
    (event) => {
      const { name, value } = event.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField, touched]
  );

  return {
    errors,
    touched,
    validateForm,
    handleBlur,
    handleChange,
    setErrors,
    setTouched,
  };
}; 