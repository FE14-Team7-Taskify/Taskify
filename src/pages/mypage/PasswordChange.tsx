'use client';

import { useChangePasswordMutation } from '@/api/auth/auth.query';
import { useRouter } from 'next/navigation';

export function usePasswordChange() {
  const router = useRouter();
  const { mutate } = useChangePasswordMutation();

  const changePassword = (pass: string, newpas: string) => {
    console.log('비밀번호 변경 요청 시작');

    mutate(
      {
        password: pass,
        newPassword: newpas,
      },
      {
        onSuccess: () => {
          alert('비밀번호가 변경되었습니다!');
          router.refresh();
        },
        onError: (error: any) => {
          alert(`비밀번호 변경 실패: ${error?.response?.data?.message || error.message}`);
          console.log('변경 실패!');
        },
      },
    );
  };

  return { changePassword };
}
