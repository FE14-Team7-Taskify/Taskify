import { ButtonHTMLAttributes } from 'react';

export type BaseButtonProps = {
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  onCancel?: () => void;
  onConfirm?: () => void;
  leftText?: string;
  rightText?: string;
  rightDisabled?: boolean;
};

export interface PaginationProps {
  totalPage?: number;
  currentPage?: number;
  setPage: (page: number) => void;
}
