import { cn } from '@/styles/util/stylesUtil';
import { ButtonHTMLAttributes } from 'react';

export default function Button({
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classNames = cn(className);
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
