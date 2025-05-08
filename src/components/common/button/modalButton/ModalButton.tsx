import BaseButton from '../BaseButton';
import { ButtonProps } from '../type';
import styles from './modalButton.module.scss';

const ModalButton = ({
  onCancel,
  onConfirm,
  leftText = '취소',
  rightText = '생성',
  rightDisabled = false,
}: ButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <BaseButton onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>
        {leftText}
      </BaseButton>
      <BaseButton
        onClick={onConfirm}
        className={`${styles.button} ${styles.confirmButton}`}
        disabled={rightDisabled}
      >
        {rightText}
      </BaseButton>
    </div>
  );
};

export default ModalButton;
