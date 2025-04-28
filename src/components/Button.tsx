import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ className = '', text, ...rest }: ButtonProps) {
  const classNames = `${styles.Button} ${className}`;
  return (
    <button className={classNames} {...rest}>
      {text}
    </button>
  );
}
