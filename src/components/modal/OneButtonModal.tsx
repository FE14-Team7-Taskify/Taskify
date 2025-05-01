import ModalWrapper from './ModalWrapper';
import styles from './modal.module.scss';

interface OneButtonModalProps {
  message: string;
  onClose: () => void;
}

export default function OneButtonModal({ message, onClose }: OneButtonModalProps) {
  return (
    <ModalWrapper btns={[{ text: '확인', onClick: onClose }]}>
      <div className={styles.messagesWrapper}>
        {message.split('\n').map((line: string, idx: number) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </ModalWrapper>
  );
}
