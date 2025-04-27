import BaseButton from '../BaseButton';
import styles from './modalButton.module.scss';
import { ModalButtonProps } from '../type';

const ModalButton = ({
  onCancel,
  onConfirm,
  cancelText = '취소',
  confirmText = '생성',
}: ModalButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <BaseButton onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>
        {cancelText}
      </BaseButton>
      <BaseButton onClick={onConfirm} className={`${styles.button} ${styles.confirmButton}`}>
        {confirmText}
      </BaseButton>
    </div>
  );
};

export default ModalButton;
