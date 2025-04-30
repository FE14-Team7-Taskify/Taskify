import { cn, cond } from '@/styles/util/stylesUtil';
import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ error = false, className = '', ...props }: InputProps) {
  const classNames = cn(styles.Input, cond(error, styles.error), className);
  return <input className={classNames} {...props} />;
}
