'use client';

import React, { FC } from 'react';
import { StyledButton } from './button.styles';

const Button: FC<{
  text: string;
  disabled?: boolean;
  btnType?: 'button' | 'submit' | 'reset' | undefined;
  primary?: boolean;
  handleClick?: (e?: React.SyntheticEvent) => void;
}> = ({ text, disabled, primary, btnType, handleClick, ...otherProps }) => {
  return (
    <StyledButton
      disabled={disabled}
      type={btnType ? btnType : 'button'}
      $primary={primary}
      onClick={handleClick}
      {...otherProps}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
