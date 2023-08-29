'use client';
import React from 'react';
import Button from '@/components/button/button.component';
import { toast } from '@/components/toast/notification.component';

import styles from '@/styles/login.module.css';
import { StyledForm } from '@/components/form/form.styles';
import OTPInput from '@/components/otp/otp-input.component';
import useVerifyOTP from '@/react-query/mutations/useVerifyOTP.mutation';
import { useUserStore } from '@/states/user.states';
import useRequestOTP from '@/react-query/mutations/useRequestOTP.mutation';

export default function OTPPage() {
  const { mutateAsync: validateOTPInput } = useVerifyOTP();
  const { mutateAsync: requestOTP } = useRequestOTP();
  const email = useUserStore((state) => state.currentUser?.user.email);

  const [otp, setOtp] = React.useState<string>('');
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const handleOtpComplete = (value: string) => {
    setOtp(value);
    setIsInvalid(false); // Reset invalid state
  };

  const handleRequestOTP = async () => {
    if (!email) {
      toast.error('No email registered yet!', { delay: 3000 });
      return;
    }

    await requestOTP({ email, purpose: '' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (otp !== '') {
      if (!email) {
        toast.error('No email registered yet!', { delay: 3000 });
        return;
      }

      await validateOTPInput({
        otp,
        email,
        purpose: 'account verification',
      });
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
          <Button btnType="submit">next</Button>
          <p
            onClick={handleRequestOTP}
            style={{
              cursor: 'pointer',
              textTransform: 'capitalize',
              userSelect: 'none',
            }}
          >
            didn&apos;t get one?. click here
          </p>
        </StyledForm>
      </div>
    </section>
  );
}
