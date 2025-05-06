import { cn } from '@/styles/util/stylesUtil';
import { HTMLAttributes } from 'react';
import styles from './modal.module.scss';

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function ModalWrapper({ className = '', title, children }: OverlayProps) {
  return (
    <div className={styles.modalWrapper}>
      <div className={cn(styles.modal, className)}>
        {!!title && <div className={styles.modalHeader}>{title}</div>}
        {children}
      </div>
    </div>
  );
}
