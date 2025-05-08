import { cn } from '@/styles/util/stylesUtil';
import { ButtonHTMLAttributes } from 'react';
import styles from './loginButton.module.scss';

export default function Button({
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classNames = cn(styles.Button, className);
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
