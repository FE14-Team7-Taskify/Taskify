import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import styles from './styles/login.module.scss';
import Image from 'next/image';
import InputForm from './components/InputForm';
import Link from 'next/link';
import { useLoginMutation } from '@/api/auth/auth.query';
import { useOverlay } from '@/contexts/OverlayProvider';
import OneButtonModal from '@/components/modal/OneButtonModal';
import { useUser } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const loginMutation = useLoginMutation();
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
  }, [user]);

  if (user === undefined)
    return (
      <div className={styles.spinnerWrapper}>
        <ClipLoader color="#4b6ef3" size={40} />
      </div>
    );

  function isFormValid() {
    return (
      values.email !== '' && values.password !== '' && errors.email === '' && errors.password === ''
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validateField(name: string, value: string) {
    switch (name) {
      case 'email':
        return emailRegex.test(value) ? '' : '이메일 형식으로 작성해주세요';
      case 'password':
        return value.length >= 8 ? '' : '8자 이상 작성해주세요';
    }
  }

  function handleInputBlur(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid()) return;

    loginMutation.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          localStorage.setItem('justLoggedIn', 'true');
          toast.success('로그인 되었습니다!');
          router.replace('/mydashboard');
        },
        onError: () =>
          overlay(
            <OneButtonModal onClose={close} message="아이디 또는 비밀번호가 일치하지 않습니다." />,
          ),
      },
    );
  }

  return (
    <div className={styles.authContainer}>
      {user ? null : (
        <>
          <div className={styles.logoWrapper}>
            <Link href="/">
              <Image src="/images/logo/logo-main.svg" width={200} height={280} alt="Taskify 로고" />
            </Link>
            <div className={styles.logoTitle}>오늘도 만나서 반가워요!</div>
          </div>

          <InputForm
            email={values.email}
            password={values.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            errors={errors}
            isFormValid={isFormValid()}
            onSubmit={handleSubmit}
          />

          <div className={styles.switchAuthWrapper}>
            회원이 아니신가요?{' '}
            <Link href="/signup" className={styles.switchAuth}>
              회원가입 하기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
