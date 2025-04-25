import api from '@/lib/axios';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetMyInfoResponse,
  UpdateMyInfoRequest,
  UpdateMyInfoResponse,
  UploadProfileImageRequest,
} from './users.schema';

const PATH = '/users';

class UsersService {
  createUser(body: CreateUserRequest) {
    return api.post<CreateUserResponse>(PATH, body);
  }
  getMyInfo() {
    return api.get<GetMyInfoResponse>(`${PATH}/me`);
  }
  updateMyInfo(body: UpdateMyInfoRequest) {
    return api.post<UpdateMyInfoResponse>(`${PATH}/me`, body);
  }
  uploadProfileImage(body: UploadProfileImageRequest) {
    return api.post<UpdateMyInfoResponse>(`${PATH}/me/image`, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export const usersService = new UsersService();
