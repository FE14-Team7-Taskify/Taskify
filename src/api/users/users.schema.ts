export type UserType = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserRequest = {
  email: string;
  nickname: string;
  password: string;
};
export type CreateUserResponse = UserType;

export type GetMyInfoResponse = UserType;

export type UpdateMyInfoRequest = {
  nickname: string;
  profileImageUrl?: string;
};

export type UpdateMyInfoResponse = UserType;

export type UploadProfileImageRequest = {
  image: string;
};

export type UploadProfileImageResponse = {
  profileImageUrl: string;
};
