import { cn } from '@/styles/util/stylesUtil';
import styles from './modal.module.scss';
import { useSetModalMessage } from '@/contexts/OverlayProvider';
import Button from '../Button';

export default function OneButtonModal({ message }: { message: string }) {
  const setMessage = useSetModalMessage();
  function handelModalClose() {
    setMessage();
  }
  return (
    <div className={styles.modalBackground}>
      <div className={cn(styles.modalContainer, styles.oneButtonModal)}>
        <div className={styles.messageContainer}>
          {message.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        <div className={styles.btnArea}>
          <Button onClick={handelModalClose}>확인</Button>
        </div>
      </div>
    </div>
  );
}
