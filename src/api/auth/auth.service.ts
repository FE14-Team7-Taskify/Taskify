import api from '@/lib/axios';
import { InternalAxiosRequestConfig } from 'axios';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
} from './auth.schema';

class AuthService {
  async login(body: LoginRequest) {
    const { data } = await api.post<LoginResponse>('/auth/login', body);
    const { user, accessToken } = data;
    if (accessToken) {
      const requestInterceptor = (config: InternalAxiosRequestConfig) => {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('user', JSON.stringify(user));
        return config;
      };
      api.interceptors.request.use(requestInterceptor);
    }
  }
  changePassword(body: ChangePasswordRequest) {
    return api.put<ChangePasswordResponse>('/auth/password', body);
  }
}
export const authService = new AuthService();
