import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetMyInfoResponse,
  UpdateMyInfoRequest,
  UpdateMyInfoResponse,
  UploadProfileImageRequest,
} from './users.schema';
import { usersService } from './users.service';

// key 정의
const QUERY_KEYS = {
  myInfo: ['user', 'me'],
};

// region 회원가입
export const useCreateUserMutation = () => {
  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: (body) => usersService.createUser(body).then((res) => res.data),
  });
};
// endregion 회원가입

// region 내 정보 조회
export const useMyInfoQuery = () => {
  return useQuery<GetMyInfoResponse>({
    queryKey: QUERY_KEYS.myInfo,
    queryFn: () => usersService.getMyInfo().then((res) => res.data),
  });
};
// region 내 정보 조회

// region 내 정보 수정
export const useUpdateMyInfoMutation = () => {
  // const queryClient = useQueryClient();
  return useMutation<UpdateMyInfoResponse, Error, UpdateMyInfoRequest>({
    mutationFn: (body) => usersService.updateMyInfo(body).then((res) => res.data),
    // onSuccess: () => {
    //   // 수정 후 내 정보 다시 불러오기
    //   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myInfo });
    // },
  });
};
// endregion 내 정보 수정

// region 프로필 이미지 업로드 (임시)
export const useUploadProfileImageMutation = () => {
  // const queryClient = useQueryClient();
  return useMutation<UpdateMyInfoResponse, Error, UploadProfileImageRequest>({
    mutationFn: (body) => usersService.uploadProfileImage(body).then((res) => res.data),
    // onSuccess: () => {
    //   // 업로드 후 내 정보 다시 불러오기
    //   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myInfo });
    // },
  });
};
// endregion 프로필 이미지 업로드 (임시)
