'use client';

import React, { FC } from 'react';
import { StyledButton } from './button.styles';

const Button: FC<{
  text: string;
  disabled?: boolean;
  btnType?: 'button' | 'submit' | 'reset' | undefined;
  primary?: boolean;
}> = ({ text, disabled, primary, btnType, ...otherProps }) => {
  return (
    <StyledButton
      disabled={disabled}
      type={btnType ? btnType : 'button'}
      $primary={primary}
      {...otherProps}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
