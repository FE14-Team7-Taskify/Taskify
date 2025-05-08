import { HTMLAttributes } from 'react';
import ModalButton from '../common/button/modalButton/ModalButton';
import { ButtonProps } from '../common/button/type';
import ModalWrapper from './ModalWrapper';

interface TwoButtonModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  btns: ButtonProps;
}

export default function TwoButtonModal({
  className = '',
  title,
  children,
  btns,
}: TwoButtonModalProps) {
  return (
    <ModalWrapper className={className} title={title}>
      {children}
      <div>
        <ModalButton {...btns} />
      </div>
    </ModalWrapper>
  );
}
