import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateMyInfoRequest,
  UpdateMyInfoResponse,
  UploadProfileImageRequest,
} from './users.schema';
import { usersService } from './users.service';

const usersQuery = {
  all: () => ['user', 'me'],
  myInfoKey: () => [],
  myInfo: () =>
    queryOptions({
      queryKey: [...usersQuery.all()],
      queryFn: () => usersService.getMyInfo(),
    }),
};

/**
 * 내 정보 조회 쿼리
 */
export const useMyInfoQuery = () => {
  return useQuery({ ...usersQuery.myInfo(), select: (res) => res.data });
};

/**
 * 회원가입 뮤테이션
 */
export const useCreateUserMutation = () => {
  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: (body) => usersService.createUser(body).then((res) => res.data),
  });
};
/**
 * 내 정보 수정 뮤테이션
 */
export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateMyInfoResponse, Error, UpdateMyInfoRequest>({
    mutationFn: (body) => usersService.updateMyInfo(body).then((res) => res.data),
    onSuccess: () => {
      // 수정 후 내 정보 다시 불러오기
      queryClient.invalidateQueries({ queryKey: usersQuery.all() });
    },
  });
};
/**
 * 프로필 이미지 업로드 뮤테이션 (임시)
 */
export const useUploadProfileImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateMyInfoResponse, Error, UploadProfileImageRequest>({
    mutationFn: (body) => usersService.uploadProfileImage(body).then((res) => res.data),
    onSuccess: () => {
      // 업로드 후 내 정보 다시 불러오기
      queryClient.invalidateQueries({ queryKey: usersQuery.all() });
    },
  });
};
