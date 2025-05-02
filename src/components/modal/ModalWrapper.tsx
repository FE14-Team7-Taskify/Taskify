import { ButtonHTMLAttributes, Component, HTMLAttributes, JSX } from 'react';
import styles from './modal.module.scss';
import Button from '../common/button/loginButton/LoginButton';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
}

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  btns?: ButtonProps[];
}

export default function ModalWrapper({ title, children, btns }: OverlayProps) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        {!!title && <div className={styles.modalHeader}>{title}</div>}
        {children}
        <div className={styles.modalBtns}>
          {btns?.map(({ text, ...btn }, idx) => (
            <Button key={`modal-button-${idx}`} {...btn}>
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
