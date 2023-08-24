'use client';
import React from 'react';
import Button from '@/components/button/button.component';

import styles from '@/styles/login.module.css';
import ShowView from '@/components/show-view/show-view.component';
import { StyledForm } from '@/components/form/form.styles';
import useSignUp from '@/react-query/mutations/useSignUp.mutation';
import OTPInput from '@/components/otp/otp-input.component';

export default function OTPPage() {
  const { mutateAsync: signUp } = useSignUp();

  const [otp, setOtp] = React.useState<string>('');
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const handleOtpComplete = (value: string) => {
    setOtp(value);
    setIsInvalid(false); // Reset invalid state
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (otp !== '') {
      // Example: Replace '123456' with your actual OTP
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <section
      className={`${styles.display_flex} ${styles.full_device_height} ${styles.full_device_width} ${styles.align_center} ${styles.justify_center} ${styles.padding_sm}`}
    >
      <div className={`${styles.margin_right_auto}`}>
        <h1 className={`${styles.apply_font_size_big} ${styles.heading_text}`}>
          <span>Verify your OTP</span>
          <span>AACSL web admin</span>
        </h1>
        <p style={{ textTransform: 'capitalize' }}>
          this web admin is only accessible to AACSL staff
        </p>
      </div>

      <div
        className={`${styles.display_flex} ${styles.justify_center} ${styles.align_center} ${styles.form_bg}`}
      >
        <StyledForm style={{ fontFamily: 'inherit' }} onSubmit={handleSubmit}>
          <OTPInput onComplete={handleOtpComplete} />
          <Button text="next" btnType="submit" />
        </StyledForm>
      </div>
    </section>
  );
}
