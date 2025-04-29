import { useState } from 'react';
import styles from './styles/mypage.module.scss';
import { usePasswordChange } from './PasswordChange'; // 경로 맞춰
import { cn, cond } from '@/styles/styleUtil';

export default function PasswordCheck() {
  const [passwordCheckForm, setPasswordCheckForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const isFormValid = Object.values(passwordCheckForm).every(Boolean);

  const { changePassword } = usePasswordChange();
  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;

    setPasswordCheckForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (passwordCheckForm.newPassword !== passwordCheckForm.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    changePassword(passwordCheckForm.currentPassword, passwordCheckForm.newPassword);
  };

  return (
    <div>
      <div className={styles.passwordBox}>
        <div className={styles.headfont}>비밀번호 변경</div>
        <div>
          <form action="/submit-url" method="POST" className={styles.formBox}>
            <div>
              현재 비밀번호
              <div>
                <input
                  name="currentPassword"
                  type="password"
                  placeholder="현재 비밀번호"
                  value={passwordCheckForm.currentPassword}
                  onChange={handleChangeInput}
                  className={styles.inputBox}
                />
              </div>
            </div>
            <div>
              새 비밀번호
              <div>
                <input
                  name="newPassword"
                  type="password"
                  placeholder="새 비밀번호"
                  value={passwordCheckForm.newPassword}
                  onChange={handleChangeInput}
                  className={styles.inputBox}
                />
              </div>
            </div>
            <div>
              새 비밀번호 확인
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={passwordCheckForm.confirmPassword}
                  onChange={handleChangeInput}
                  className={styles.inputBox}
                />
              </div>
            </div>
          </form>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={cn(
              styles.saveChangeButton,
              cond(isFormValid, styles.saveChangeButtonActive),
            )}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}
