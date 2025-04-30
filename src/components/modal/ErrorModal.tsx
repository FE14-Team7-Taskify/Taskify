import styles from './ErrorModal.module.scss';
import Button from '@/components/common/Button';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <Button onClick={onClose}>확인</Button>
      </div>
    </div>
  );
}
