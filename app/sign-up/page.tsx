'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import styles from '@/styles/login.module.css';
import { useForm } from '@/hooks/useForm.hook';
import Button from '@/components/button/button.component';
import ShowView from '@/components/show-view/show-view.component';
import { StyledForm } from '@/components/form/form.styles';
import useSignUp from '@/react-query/mutations/useSignUp.mutation';
import { FormButtonContainer } from '@/styles/main.styles';
import { useUserStore } from '@/states/user.states';

export default function SignUp() {
  const setUserEmail = useUserStore((state) => state.updateEmail);

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => setIsMounted(true), [isMounted]);

  const { formValues, handleInputChange, resetForm, validateForm, errors } =
    useForm({
      initialValues: { email: '', password: '', passwordConfirm: '' },
      requiredFields: ['email', 'password', 'passwordConfirm'],
    });

  const {
    formValues: values,
    handleInputChange: handleDataChange,
    resetForm: formReset,
    validateForm: formValidate,
    errors: formErrors,
  } = useForm({
    initialValues: { firstName: '', lastName: '', department: '' },
    requiredFields: ['firstName', 'lastName', 'department'],
  });
  const { mutateAsync: signUp } = useSignUp();

  const [next, setNext] = React.useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatchError] = React.useState<
    string | undefined
  >(undefined);

  const [formData, setFormData] = React.useState<{ [key: string]: string }>({});

  const handleNextPage = (event: React.FormEvent) => {
    event.preventDefault();
    if (formValidate()) {
      setFormData({ ...values });
      setNext(true);
    }
  };

  const handlePrevious = () => {
    setNext((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    // submit form when form is valid
    if (isValid) {
      if (formValues.password !== formValues.passwordConfirm) {
        setPasswordMismatchError('password and password confirm must match');
      } else {
        setPasswordMismatchError(undefined);
      }
      setFormData({ ...formValues, ...values });
      setUserEmail(formData.email);
      await signUp({ ...formData });
      resetForm();
      formReset();
    }
  };

  const router = useRouter();

  return (
    <section
      className={`${styles.display_flex} ${styles.full_device_height} ${styles.full_device_width} ${styles.align_center} ${styles.justify_center} ${styles.padding_sm}`}
    >
      <div className={`${styles.margin_right_auto}`}>
        <h1 className={`${styles.apply_font_size_big} ${styles.heading_text}`}>
          <span>Sign up on</span>
          <span>AACSL web admin</span>
        </h1>
        <p style={{ textTransform: 'capitalize' }}>
          this web admin is only accessible to AACSL staff
        </p>
      </div>

      <div
        className={`${styles.display_flex} ${styles.justify_center} ${styles.align_center} ${styles.form_bg}`}
      >
        <ShowView when={!next}>
          <StyledForm
            style={{ fontFamily: 'inherit' }}
            onSubmit={handleNextPage}
          >
            <div className={`${styles.form_group} ${styles.display_flex}`}>
              <label htmlFor="email" className={`${styles.form_label}`}>
                first name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="john"
                className={`${styles.input_field}`}
                defaultValue={values.firstName}
                onChange={handleDataChange}
              />
              {formErrors?.email && <p>{formErrors.firstName}</p>}
            </div>
            <div className={`${styles.form_group} ${styles.display_flex}`}>
              <label htmlFor="lastName" className={`${styles.form_label}`}>
                last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="doe"
                defaultValue={values.lastName}
                className={`${styles.input_field}`}
                onChange={handleDataChange}
              />
              <ShowView when={!!formErrors?.lastName}>
                <p>{formErrors?.lastName}</p>
              </ShowView>
            </div>
            <div className={`${styles.form_group} ${styles.display_flex}`}>
              <label htmlFor="department" className={`${styles.form_label}`}>
                department
              </label>
              <input
                type="text"
                name="department"
                id="department"
                defaultValue={values.department}
                className={`${styles.input_field}`}
                onChange={handleDataChange}
              />
              <ShowView when={!!formErrors?.department}>
                <p>{formErrors?.department}</p>
              </ShowView>
            </div>
            <FormButtonContainer>
              <p onClick={() => router.push('/')}>back</p>
              <Button btnType="submit">next</Button>
            </FormButtonContainer>
          </StyledForm>
        </ShowView>

        <ShowView when={next}>
          <StyledForm style={{ fontFamily: 'inherit' }} onSubmit={handleSubmit}>
            <div className={`${styles.form_group} ${styles.display_flex}`}>
              <label htmlFor="email" className={`${styles.form_label}`}>
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@aacsl.com"
                className={`${styles.input_field}`}
                defaultValue={formValues.email}
                onChange={handleInputChange}
              />
              {errors?.email && <p>{errors.email}</p>}
            </div>
            <div className={`${styles.form_group} ${styles.display_flex}`}>
              <label htmlFor="password" className={`${styles.form_label}`}>
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                defaultValue={formValues.password}
                className={`${styles.input_field}`}
                onChange={handleInputChange}
              />
              <ShowView when={!!errors?.password}>
                <p>{errors?.password}</p>
              </ShowView>
            </div>
            <div className={`${styles.form_group} ${styles.display_flex}`}>
              <label
                htmlFor="passwordConfirm"
                className={`${styles.form_label}`}
              >
                confirm password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                defaultValue={formValues.passwordConfirm}
                className={`${styles.input_field}`}
                onChange={handleInputChange}
              />
              <ShowView when={!!errors?.passwordConfirm || !!passwordMismatch}>
                <p>{errors?.passwordConfirm || passwordMismatch}</p>
              </ShowView>
            </div>
            <FormButtonContainer>
              <p onClick={handlePrevious}>back</p>
              <Button btnType="submit">sign up</Button>
            </FormButtonContainer>
          </StyledForm>
        </ShowView>
      </div>
    </section>
  );
}
