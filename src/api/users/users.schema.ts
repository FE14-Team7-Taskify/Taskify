export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

// region 회원가입
export type CreateUserRequest = {
  email: string;
  nickname: string;
  password: string;
};
export type CreateUserResponse = User | { message: string };
// endregion 회원가입

// region 내 정보 조회
export type GetMyInfoResponse = User | { message: string };
// endregion 내 정보 조회

// region 내 정보 수정
export type UpdateMyInfoRequest = {
  nickname: string;
  profileImageUrl: string;
};
export type UpdateMyInfoResponse = User | { message: string };
// endregion 내 정보 수정

// region 프로필 이미지 업로드
export type UploadProfileImageRequest = {
  image: string;
};
export type UploadProfileImageResponse = {
  profileImageUrl: string;
};
// endregion 프로필 이미지 업로드
