import { useSetUser } from '@/contexts/AuthProvider';
import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { InternalAxiosRequestConfig } from 'axios';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
} from './auth.schema';
import { authService } from './auth.service';

/**
 * 로그인 뮤테이션
 */
export const useLoginMutation = () => {
  const setUser = useSetUser();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (body) => authService.login(body).then((res) => res.data),
    onSuccess: (result) => {
      const { user, accessToken } = result;
      setUser(user);
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        const requestInterceptor = (config: InternalAxiosRequestConfig) => {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          return config;
        };
        api.interceptors.request.use(requestInterceptor);
      }
    },
  });
};
/**
 * 비밀번호 변경 뮤테이션
 */
export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
    mutationFn: (body) => authService.changePassword(body).then((res) => res.data),
  });
};
