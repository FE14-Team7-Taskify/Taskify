import { UserType } from '../users/users.schema';

export type LoginRequest = { email: string; password: string };

export type LoginResponse = { user: UserType; accessToken: string };

export type ChangePasswordRequest = { password: string; newPassword: string };

export type ChangePasswordResponse = { message?: string };
