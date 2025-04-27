import { useSetUser } from '@/contexts/AuthProvider';
import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { InternalAxiosRequestConfig } from 'axios';
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
      const { user, accessToken } = result;
      if (accessToken) {
        const requestInterceptor = (config: InternalAxiosRequestConfig) => {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          return config;
        };
        api.interceptors.request.use(requestInterceptor);
      }
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
