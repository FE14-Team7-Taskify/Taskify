import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import ModalWrapper from './ModalWrapper';
import styles from './modal.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
}

interface TwoButtonModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  btns: [ButtonProps, ButtonProps];
}

export default function TwoButtonModal({ title, children, btns }: TwoButtonModalProps) {
  const [btnLeft, btnRight] = btns;
  return (
    <ModalWrapper title={title}>
      {children}
      <div className={styles.modalBtns}>
        <button onClick={btnLeft.onClick}>{btnLeft.text}</button>
        <button onClick={btnRight.onClick}>{btnRight.text}</button>
      </div>
    </ModalWrapper>
  );
}
