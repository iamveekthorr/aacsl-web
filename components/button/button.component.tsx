'use client';

import React, { FC } from 'react';
import { StyledButton } from './button.styles';

const Button: FC<{
  disabled?: boolean;
  btnType?: 'button' | 'submit' | 'reset' | undefined;
  primary?: boolean;
  handleClick?: (e?: React.SyntheticEvent) => void;
  children: React.ReactNode;
}> = ({ disabled, primary, children, btnType, handleClick, ...otherProps }) => {
  return (
    <StyledButton
      disabled={disabled}
      type={btnType ? btnType : 'button'}
      $primary={primary}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
