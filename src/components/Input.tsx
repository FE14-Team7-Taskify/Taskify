import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...rest }: InputProps) {
  const classNames = `${styles.Input} ${className}`;
  return <input className={classNames} {...rest} />;
}
