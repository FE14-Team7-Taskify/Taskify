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
        <button onClick={onClose}>확인</button>
      </div>
    </ModalWrapper>
  );
}
