import { useSetUser } from '@/contexts/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
} from './auth.schema';
import { authService } from './auth.service';

// region 로그인
export const useLoginMutation = () => {
  const setUser = useSetUser();
  const router = useRouter();
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (body) => authService.login(body).then((res) => res.data),
    onSuccess: (result) => {
      const { user } = result;
      setUser(user);
      router.push('/mydashboard');
    },
  });
};
// endregion 로그인

// region 비밀번호 변경
export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
    mutationFn: (body) => authService.changePassword(body).then((res) => res.data),
  });
};
// endregion 비밀번호 변경
