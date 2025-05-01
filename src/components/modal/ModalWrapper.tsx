import { HTMLAttributes } from 'react';
import styles from './modal.module.scss';

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function ModalWrapper({ title, children }: OverlayProps) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        {!!title && <div className={styles.modalHeader}>{title}</div>}
        {children}
      </div>
    </div>
  );
}
