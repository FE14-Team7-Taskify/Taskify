import api from '@/lib/axios';
import { InternalAxiosRequestConfig } from 'axios';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
} from './auth.schema';

const PATH = '/auth';

class AuthService {
  async login(body: LoginRequest) {
    const result = await api.post<LoginResponse>(`${PATH}/login`, body);
    const { accessToken } = result.data;
    if (accessToken) {
      const requestInterceptor = (config: InternalAxiosRequestConfig) => {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
      };
      api.interceptors.request.use(requestInterceptor);
    }
    return result;
  }
  changePassword(body: ChangePasswordRequest) {
    return api.put<ChangePasswordResponse>(`${PATH}/password`, body);
  }
}
export const authService = new AuthService();
