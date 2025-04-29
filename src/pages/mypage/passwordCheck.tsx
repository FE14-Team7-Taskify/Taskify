'use client';
import { useEffect, useState } from 'react';
import styles from './styles/mypage.module.scss';
import { usePasswordChange } from './passwordChange'; // 경로 맞춰

export default function PasswordCheck() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { changePassword } = usePasswordChange();

  useEffect(() => {
    if (currentPassword && newPassword && confirmPassword) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    changePassword(currentPassword, newPassword);
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
                  type="password"
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={styles.inputBox}
                />
              </div>
            </div>
            <div>
              새 비밀번호
              <div>
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.inputBox}
                />
              </div>
            </div>
            <div>
              새 비밀번호 확인
              <div>
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.inputBox}
                  ß
                />
              </div>
            </div>
          </form>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`${styles.saveChangeButton} ${isFormValid ? styles.saveChangeButtonActive : ''}`}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}
