import { HTMLAttributes } from 'react';
import styles from './modal.module.scss';
import Button from '../common/button/loginButton/LoginButton';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
}

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
