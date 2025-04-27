import styles from './loginButton.module.scss';
import { LoginButtonProps } from '../type';

const LoginButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: LoginButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};

export default LoginButton;
