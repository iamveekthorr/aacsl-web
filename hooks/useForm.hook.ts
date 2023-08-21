import { useState, ChangeEvent } from 'react';

interface FormInputProps {
  initialValues?: Record<string, any>;
  requiredFields?: string[];
}

export const useForm = ({
  initialValues = {},
  requiredFields = [],
}: FormInputProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((fieldName) => {
      if (!formValues[fieldName].length) {
        newErrors[fieldName] = `${fieldName} is required`;
      } else {
        newErrors[fieldName] = ''; // Clear the error if the field has a value
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  return {
    formValues,
    handleInputChange,
    resetForm,
    validateForm,
    errors,
  };
};
