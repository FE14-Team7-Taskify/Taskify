import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './styles/signup.module.scss';
import Image from 'next/image';
import InputForm from './components/InputForm';
import Link from 'next/link';
import { useCreateUserMutation } from '@/api/users/users.query';
import { useOverlay } from '@/contexts/OverlayProvider';
import OneButtonModal from '@/components/modal/OneButtonModal';
import { useUser } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const VALIDATION_RULES = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: '이메일 형식으로 작성해주세요',
  },
  nickname: {
    validate: (value: string) => value.length <= 10 && value !== '',
    errorMessage: '10자 이하로 작성해주세요',
  },
  password: {
    validate: (value: string) => value.length >= 8,
    errorMessage: '8자 이상 입력해주세요',
  },
  confirmPassword: {
    validate: (value: string, password: string) => value === password,
    errorMessage: '비밀번호가 일치하지 않습니다',
  },
} as const;
// 타입화 하기
const INIT_FORM_VALUES = {
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
};
type FormFields = keyof typeof INIT_FORM_VALUES;

export default function Signup() {
  const [signupForm, setSignupForm] = useState(INIT_FORM_VALUES);
  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const signupMutation = useCreateUserMutation();
  const { close, overlay } = useOverlay();
  const user = useUser();
  const router = useRouter();
  const alreadyRedirectedRef = useRef(false);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem('justLoggedIn');

    if (user) {
      if (justLoggedIn === 'true') {
        localStorage.removeItem('justLoggedIn');
        alreadyRedirectedRef.current = true;
        router.replace('/mydashboard');
        return;
      }

      if (!alreadyRedirectedRef.current) {
        toast.error('이미 로그인 된 계정입니다.');
        alreadyRedirectedRef.current = true;
        router.replace('/mydashboard');
      }
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className={styles.spinnerWrapper}>
        <ClipLoader color="#4b6ef3" size={40} />
      </div>
    );
  }

  function isFormValid() {
    return (
      signupForm.email !== '' &&
      emailRegex.test(signupForm.email) &&
      signupForm.nickname !== '' &&
      signupForm.nickname.length <= 10 &&
      signupForm.password.length >= 8 &&
      signupForm.confirmPassword === signupForm.password
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password' && confirmPasswordTouched) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: signupForm.confirmPassword === value ? '' : '비밀번호가 일치하지 않습니다',
      }));
    }
  }

  function validateField(name: FormFields, value: string) {
    const rule = VALIDATION_RULES[name];
    if (!rule) return '';
    if (!rule || rule.validate(value, signupForm.password)) return '';
    return rule.errorMessage;
  }

  function handleInputBlur(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'confirmPassword') setConfirmPasswordTouched(true);

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as FormFields, value),
    }));
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setAgreed(e.target.checked);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid()) return;

    signupMutation.mutate(
      { email: signupForm.email, nickname: signupForm.nickname, password: signupForm.password },
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

  return user ? null : (
    <>
      <div className={styles.authContainer}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image src="/images/logo/logo-main.svg" width={200} height={280} alt="Taskify 로고" />
          </Link>
          <div className={styles.logoTitle}>첫 방문을 환영합니다!</div>
        </div>

        <InputForm
          email={signupForm.email}
          nickname={signupForm.nickname}
          password={signupForm.password}
          confirmPassword={signupForm.confirmPassword}
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
    </>
  );
}
