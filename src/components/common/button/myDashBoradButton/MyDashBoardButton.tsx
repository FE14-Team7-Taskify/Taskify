import BaseButton from '../BaseButton';
import styles from './myDashBoardButton.module.scss';
import { ButtonProps } from '../type';

const MyDashBoardButton = ({
  onCancel,
  onConfirm,
  leftText = '수락',
  rightText = '거절',
}: ButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <BaseButton onClick={onCancel} className={`${styles.button} ${styles.acceptButton}`}>
        {leftText}
      </BaseButton>
      <BaseButton onClick={onConfirm} className={`${styles.button} ${styles.rejectButton}`}>
        {rightText}
      </BaseButton>
    </div>
  );
};

export default MyDashBoardButton;
