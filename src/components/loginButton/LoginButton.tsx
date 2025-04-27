import BaseButton from '../BaseButton';
import styles from './loginButton.module.scss';
import { BaseButtonProps } from '../type';

const LoginButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: Omit<BaseButtonProps, 'className'>) => {
  return (
    <BaseButton type={type} onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </BaseButton>
  );
};

export default LoginButton;
