import React from 'react';
import { useLoginMutation } from '@/api/auth/auth.query'; // 경로 맞게 수정해
import { useRouter } from 'next/router';

const TempLogin = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError, error, data } = useLoginMutation();

  const handleLogin = () => {
    mutate(
      {
        email: 'temp1234@naver.com',
        password: 'temp5678',
      },
      {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          router.push('/mypage');
        },
      },
    );
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={isPending}>
        {isPending ? '로그인 중...' : '임시 로그인'}
      </button>

      {isError && <p>에러 발생: {error.message}</p>}
    </div>
  );
};

export default TempLogin;
