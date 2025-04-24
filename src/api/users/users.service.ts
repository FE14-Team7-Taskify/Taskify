import api from '@/lib/axios';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetMyInfoResponse,
  UpdateMyInfoRequest,
  UpdateMyInfoResponse,
  UploadProfileImageRequest,
} from './users.schema';

class UserService {
  createUser(body: CreateUserRequest) {
    return api.post<CreateUserResponse>('/users', body);
  }
  getMyInfo() {
    return api.get<GetMyInfoResponse>('/users/me');
  }
  updateMyInfo(body: UpdateMyInfoRequest) {
    return api.post<UpdateMyInfoResponse>('/users/me', body);
  }
  uploadProfileImage(body: UploadProfileImageRequest) {
    return api.post<UpdateMyInfoResponse>('/users/me/image', body);
  }
}

export const userService = new UserService();
