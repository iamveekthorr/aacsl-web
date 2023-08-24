import React, { useState, useRef } from 'react';
import styles from './otp-input.module.css';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete }) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(length).fill('')
  );
  const inputRefs = useRef<HTMLInputElement[]>(Array.from({ length }));

  const handleChange = (index: number, value: string) => {
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus(); // Use optional chaining
    }

    const otp = newValues.join('');
    if (otp.length === length) {
      onComplete(otp);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Use optional chaining
    }
  };

  return (
    <div className={styles.otpContainer}>
      {otpValues.map((value, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)} // Type assertion
          className={styles.otpInput}
          type="tel"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
