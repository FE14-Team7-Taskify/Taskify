import { LabelHTMLAttributes } from 'react';
import styles from './Label.module.scss';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export default function Label({ className = '', text, ...rest }: LabelProps) {
  const classNames = `${styles.Label} ${className}`.trim();
  return (
    <label className={classNames} {...rest}>
      {text}
    </label>
  );
}
