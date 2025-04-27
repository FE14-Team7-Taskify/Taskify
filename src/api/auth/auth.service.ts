import api from '@/lib/axios';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
} from './auth.schema';

const PATH = '/auth';

class AuthService {
  async login(body: LoginRequest) {
    return api.post<LoginResponse>(`${PATH}/login`, body);
  }
  changePassword(body: ChangePasswordRequest) {
    return api.put<ChangePasswordResponse>(`${PATH}/password`, body);
  }
}
export const authService = new AuthService();
