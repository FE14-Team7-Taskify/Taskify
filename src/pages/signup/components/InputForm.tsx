import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/InputForm.module.scss';
import Label from '@/components/common/Label';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Image from 'next/image';

interface InputFormProps {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: { email: string; nickname: string; password: string; confirmPassword: string };
  isFormValid: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  agreed: boolean;
  onAgreementChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({
  email,
  nickname,
  password,
  confirmPassword,
  onChange,
  onBlur,
  errors,
  isFormValid,
  onSubmit,
  agreed,
  onAgreementChange,
}: InputFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword((prev) => !prev);
  }

  return (
    <form className={styles.inputFormContainer} onSubmit={onSubmit}>
      {/* 이메일 */}
      <div className={styles.inputForm}>
        <Label htmlFor="email">이메일 *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.email}
        />
        {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
      </div>
      {/* 닉네임 */}
      <div className={styles.inputForm}>
        <Label htmlFor="nickname">닉네임 *</Label>
        <Input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.nickname}
        />
        {errors.nickname && <div className={styles.errorMessage}>{errors.nickname}</div>}
      </div>
      {/* 비밀번호 */}
      <div className={styles.inputForm}>
        <Label htmlFor="password">비밀번호 *</Label>
        <div className={styles.inputFormWrapper}>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="8자 이상 입력해주세요"
            value={password}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.password}
          />
          {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}

          <Image
            src={showPassword ? '/icon/eyes_open.svg' : '/icon/eyes_close.svg'}
            className={styles.passwordToggle}
            width={24}
            height={24}
            alt={showPassword ? '비밀번호 표시' : '비밀번호 숨김'}
            onClick={togglePasswordVisibility}
          />
        </div>
      </div>
      {/* 비밀번호 확인 */}
      <div className={styles.inputForm}>
        <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
        <div className={styles.inputFormWrapper}>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={confirmPassword}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <div className={styles.errorMessage}>{errors.confirmPassword}</div>
          )}

          <Image
            src={showConfirmPassword ? '/icon/eyes_open.svg' : '/icon/eyes_close.svg'}
            className={styles.passwordToggle}
            width={24}
            height={24}
            alt={showConfirmPassword ? '비밀번호 표시' : '비밀번호 숨김'}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
      </div>
      <div className={styles.inputFormAgreement}>
        <Input type="checkbox" id="agreement" checked={agreed} onChange={onAgreementChange} />{' '}
        <Label htmlFor="agreement">이용 약관에 동의합니다.</Label>
      </div>
      <Button className={styles.authButton} disabled={!isFormValid || !agreed}>
        가입하기
      </Button>
    </form>
  );
}
