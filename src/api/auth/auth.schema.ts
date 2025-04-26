import { User } from '../users/users.schema';

export type LoginRequest = { email: string; password: string };

export type LoginResponse = { user: User; accessToken: string };

export type ChangePasswordRequest = { password: string; newPassword: string };

export type ChangePasswordResponse = { message?: string };
