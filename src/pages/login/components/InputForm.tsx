import { ChangeEvent, useState } from 'react';
import styles from '../styles/InputForm.module.scss';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Image from 'next/image';

interface InputFormProps {
  email: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: { email: string; password: string };
  isFromValid: boolean;
}

export default function InputForm({
  email,
  password,
  onChange,
  onBlur,
  errors,
  isFromValid,
}: InputFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <form className={styles.inputFormContainer}>
      <div className={styles.inputForm}>
        <Label htmlFor="email">이메일</Label>
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

      <div className={styles.inputForm}>
        <Label htmlFor="password">비밀번호</Label>
        <div className={styles.inputFormWrapper}>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
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

      <Button className={styles.authButton} disabled={!isFromValid}>
        로그인
      </Button>
    </form>
  );
}
