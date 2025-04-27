import React from 'react';

export type BaseButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className: string;
};

export type ButtonProps = {
  onCancel?: () => void;
  onConfirm?: () => void;
  leftText?: string;
  rightText?: string;
};
