import BaseButton from '../common/button/BaseButton';
import ModalWrapper from './ModalWrapper';
import styles from './modal.module.scss';

interface OneButtonModalProps {
  message: string;
  onClose: () => void;
}

export default function OneButtonModal({ message, onClose }: OneButtonModalProps) {
  return (
    <ModalWrapper>
      <div className={styles.messagesWrapper}>
        {message.split('\n').map((line: string, idx: number) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <div className={styles.modalBtns}>
        <BaseButton onClick={onClose} className={styles.btnCenter}>
          확인
        </BaseButton>
      </div>
    </ModalWrapper>
  );
}
