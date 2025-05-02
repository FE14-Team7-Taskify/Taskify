import React from 'react';
import { BaseButtonProps } from './type';

const BaseButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
}: BaseButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default BaseButton;
