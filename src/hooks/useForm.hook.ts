import { useState, ChangeEvent } from 'react';

interface FormInputProps {
  initialValues?: Record<string, any>;
}

export const useForm = ({ initialValues = {} }: FormInputProps) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    handleInputChange,
    resetForm,
  };
};
