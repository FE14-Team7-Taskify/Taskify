import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './styles/signup.module.scss';
import Image from 'next/image';
import InputForm from './components/InputForm';
import Link from 'next/link';
import { useCreateUserMutation } from '@/api/users/users.query';
import { useOverlay } from '@/contexts/OverlayProvider';
import OneButtonModal from '@/components/modal/OneButtonModal';
import { useRouter } from 'next/router';

export default function Signup() {
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false); // ✅ 추가
  const [agreed, setAgreed] = useState(false);
  const signupMutation = useCreateUserMutation();
  const { close, overlay } = useOverlay();
  const router = useRouter();
  function isFormValid() {
    return (
      values.email !== '' &&
      emailRegex.test(values.email) &&
      values.nickname !== '' &&
      values.nickname.length <= 10 &&
      values.password.length >= 8 &&
      values.confirmPassword === values.password
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // password 일치 검사 이후 password 변경 시, confirmPassword와 비교해서 에러 갱신
    if (name === 'password' && confirmPasswordTouched) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: values.confirmPassword === value ? '' : '비밀번호가 일치하지 않습니다',
      }));
    }
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setAgreed(e.target.checked);
  }

  function handleInputBlur(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? '' : '이메일 형식으로 입력해주세요',
      }));
    }
    if (name === 'nickname') {
      setErrors((prev) => ({
        ...prev,
        nickname: value.length <= 10 ? '' : '10자 이하로 입력해주세요',
      }));
    }
    if (name === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: value.length >= 8 ? '' : '8자 이상 입력해주세요',
      }));
    }
    if (name === 'confirmPassword') {
      setConfirmPasswordTouched(true);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value === values.password ? '' : '비밀번호가 일치하지 않습니다',
      }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid()) return;

    signupMutation.mutate(
      { email: values.email, nickname: values.nickname, password: values.password },
      {
        onSuccess: () =>
          overlay(
            <OneButtonModal
              onClose={() => {
                close();
                router.push('/login');
              }}
              message="가입이 완료되었습니다!"
            />,
          ),
        onError: () =>
          overlay(<OneButtonModal onClose={close} message="이미 사용중인 이메일입니다." />),
      },
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image src="/images/logo/logo-main.svg" width={200} height={280} alt="Taskify 로고" />
        </Link>
        <div className={styles.logoTitle}>첫 방문을 환영합니다!</div>
      </div>

      <InputForm
        email={values.email}
        nickname={values.nickname}
        password={values.password}
        confirmPassword={values.confirmPassword}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        errors={errors}
        isFormValid={isFormValid()}
        onSubmit={handleSubmit}
        agreed={agreed}
        onAgreementChange={handleCheckboxChange}
      />

      <div className={styles.switchAuthWrapper}>
        이미 회원이신가요?{' '}
        <Link href="/login" className={styles.switchAuth}>
          로그인 하기
        </Link>
      </div>
    </div>
  );
}
