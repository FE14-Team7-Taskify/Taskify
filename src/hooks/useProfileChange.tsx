'use client';

import { useUpdateMyInfoMutation } from '@/api/users/users.query';

export function useProfileChange() {
  const { mutate } = useUpdateMyInfoMutation();

  const changeProfile = (
    nickname: string,
    imageUrl: string,
    callbacks?: {
      onSuccess?: () => void;
      onError?: (msg: string) => void;
    },
  ) => {
    console.log('닉네임 변경 요청 시작');

    mutate(
      {
        nickname,
        profileImageUrl: imageUrl || '', // null이면 빈 문자열 처리
      },
      {
        onSuccess: () => {
          callbacks?.onSuccess?.();
        },
        onError: (error: unknown) => {
          let msg = '프로필 변경 실패: 알 수 없는 오류';
          if (error && typeof error === 'object' && 'message' in error) {
            msg = `프로필 변경 실패: ${(error as { message?: string })?.message}`;
          }
          callbacks?.onError?.(msg);
          console.error('변경 실패!', error);
        },
      },
    );
  };

  return { changeProfile };
}
