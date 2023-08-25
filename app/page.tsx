'use client';
import Link from 'next/link';
import Button from '@/components/button/button.component';

import styles from '@/styles/login.module.css';
import { useForm } from '@/hooks/useForm.hook';
import useLogin from '@/react-query/mutations/useLogin.mutation';
import ShowView from '@/components/show-view/show-view.component';
import { StyledForm } from '@/components/form/form.styles';

export default function Login() {
  const { formValues, handleInputChange, resetForm, validateForm, errors } =
    useForm({
      initialValues: { email: '', password: '' },
      requiredFields: ['email', 'password'],
    });
  const { mutateAsync: login } = useLogin();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    // submit form when form is valid
    if (isValid) {
      await login({ ...formValues });
      resetForm();
    }
  };

  return (
    <section
      className={`${styles.display_flex} ${styles.full_device_height} ${styles.full_device_width} ${styles.align_center} ${styles.justify_center} ${styles.padding_sm}`}
    >
      <div className={`${styles.margin_right_auto}`}>
        <h1 className={`${styles.apply_font_size_big} ${styles.heading_text}`}>
          <span>Sign in to</span>
          <span>AACSL web admin</span>
        </h1>
        <p>this web admin is only accessible to AACSL admin</p>
      </div>

      <div
        className={`${styles.display_flex} ${styles.justify_center} ${styles.align_center} ${styles.form_bg}`}
      >
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
          <Button text="login" btnType="submit" />

          <p>
            If you do not have an account, please{' '}
            <Link href="/sign-up" style={{ color: 'blue' }}>
              sign up
            </Link>
          </p>
        </StyledForm>
      </div>
    </section>
  );
}
