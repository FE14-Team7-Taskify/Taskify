import { cn } from '@/styles/util/stylesUtil';
import { LabelHTMLAttributes } from 'react';
import styles from './Label.module.scss';

export default function Label({
  className = '',
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  const classNames = cn(styles.Label, className);
  return (
    <label className={classNames} {...props}>
      {children}
    </label>
  );
}
