'use client';
import { useEffect, useState } from 'react';
import styles from './styles/mypage.module.scss';
import Button from '@/components/common/button/myPageButton/MypageButton';
import Input from '@/components/common/Input';
import buttonStyles from '@/components/common/button/myPageButton/myPageButton.module.scss';
import { useChangePasswordMutation } from '@/api/auth/auth.query';
import { useRouter } from 'next/navigation';
import OneButtonModal from '@/components/modal/OneButtonModal';

export default function PasswordCheck() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isMismatch, setIsMismatch] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const router = useRouter();
  const { mutate } = useChangePasswordMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changePassword = (currentPassword: string, newPassword: string) => {
    console.log('비밀번호 변경 요청 시작');

    mutate(
      {
        password: currentPassword,
        newPassword: newPassword,
      },
      {
        onSuccess: () => {
          alert('변경 성공!');
          router.refresh();
        },
        onError: (error: any) => {
          console.log('비밀번호 변경 실패:', error);
          setIsModalOpen(true);
        },
      },
    );
  };

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
      return;
    }

    changePassword(currentPassword, newPassword);
  };

  return (
    <div>
      <div className={styles.passwordBox}>
        <div className={styles.headfont}>비밀번호 변경</div>
        <div className={styles.passwordInputBox}>
          <div className={styles.formBox}>
            <div>
              현재 비밀번호
              <div>
                <Input
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
                <Input
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
                <Input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => {
                    setIsTouched(true);
                    setIsMismatch(newPassword !== confirmPassword);
                  }}
                  className={`${styles.inputBox} ${isTouched && isMismatch ? styles.errorInput : ''}`}
                />
                {isTouched && isMismatch && (
                  <p className={styles.errorText}>새 비밀번호가 일치하지 않습니다</p>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`${buttonStyles.saveChangeButton} ${isFormValid ? buttonStyles.saveChangeButtonActive : ''}`}
          >
            변경
          </Button>
        </div>
        {isModalOpen && (
          <OneButtonModal message="실패했습니다." onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
