'use client';

import { useUpdateMyInfoMutation } from '@/api/users/users.query';
import { useRouter } from 'next/navigation';

export function useProfileChange() {
  const router = useRouter();
  const { mutate } = useUpdateMyInfoMutation();

  const changeProfile = (nickname: string, imageUrl: string) => {
    console.log('닉네임 변경 요청 시작');

    mutate(
      {
        nickname,
        profileImageUrl: imageUrl || '', // null이면 빈 문자열 처리
      },
      {
        onSuccess: () => {
          alert('프로필이 변경되었습니다!');
          router.refresh(); // 페이지 새로고침
        },
        onError: (error: unknown) => {
          if (error && typeof error === 'object' && 'message' in error) {
            alert(`프로필 변경 실패: ${(error as { message?: string })?.message}`);
          } else {
            alert('프로필 변경 실패: 알 수 없는 오류');
          }
          console.log('변경 실패!', error);
        },
      },
    );
  };

  return { changeProfile };
}
