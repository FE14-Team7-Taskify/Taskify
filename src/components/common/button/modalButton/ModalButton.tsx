import BaseButton from '../BaseButton';
import styles from './modalButton.module.scss';
import { ButtonProps } from '../type';

const ModalButton = ({
  onCancel,
  onConfirm,
  leftText = '취소',
  rightText = '생성',
}: ButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <BaseButton onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>
        {leftText}
      </BaseButton>
      <BaseButton onClick={onConfirm} className={`${styles.button} ${styles.confirmButton}`}>
        {rightText}
      </BaseButton>
    </div>
  );
};

export default ModalButton;
