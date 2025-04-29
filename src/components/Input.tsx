import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ error = false, className = '', ...rest }: InputProps) {
  const classNames = `${styles.Input} ${error ? styles.error : ''} ${className}`.trim();
  return <input className={classNames} {...rest} />;
}
