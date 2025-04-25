import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FindMembersRequest, FindMembersResponse } from './members.schema';
import { membersService } from './members.service';

// key 정의
const QUERY_KEYS = {
  members: ['members'],
};

// region 대시보드 멤버 목록 조회
export const useDashboardMembersQuery = (params: FindMembersRequest) => {
  return useQuery<FindMembersResponse>({
    queryKey: [...QUERY_KEYS.members, params],
    queryFn: () => membersService.getDashboardMembers(params).then((res) => res.data),
  });
};
// endregion 대시보드 멤버 목록 조회

// region 대시보드 멤버 삭제
export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (memberId) => membersService.deleteMember(memberId).then((res) => res.data),
    onSuccess: () => {
      // 삭제 후 멤버 목록 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members });
    },
  });
};
// endregion 대시보드 멤버 삭제
