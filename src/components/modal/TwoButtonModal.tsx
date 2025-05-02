import { HTMLAttributes } from 'react';
import ModalButton from '../common/button/modalButton/ModalButton';
import { ButtonProps } from '../common/button/type';
import ModalWrapper from './ModalWrapper';
import styles from './modal.module.scss';

interface TwoButtonModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  btns: ButtonProps;
}

export default function TwoButtonModal({ title, children, btns }: TwoButtonModalProps) {
  return (
    <ModalWrapper title={title}>
      {children}
      <div>
        <ModalButton {...btns} />
      </div>
    </ModalWrapper>
  );
}
