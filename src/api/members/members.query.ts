import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FindMembersRequest } from './members.schema';
import { membersService } from './members.service';

const membersQuery = {
  all: () => ['members'],
  dashboardMemberListKey: (params: FindMembersRequest) => [...membersQuery.all(), params],
  dashboardMemberList: (params: FindMembersRequest) =>
    queryOptions({
      queryKey: [...membersQuery.all(), params],
      queryFn: () => membersService.getDashboardMembers(params),
    }),
};

/**
 * 대시보드 멤버 목록 조회 쿼리
 */
export const useDashboardMembersQuery = (params: FindMembersRequest) => {
  return useQuery({ ...membersQuery.dashboardMemberList(params), select: (res) => res.data });
};

/**
 * 대시보드 멤버 삭제
 */
export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (memberId) => membersService.deleteMember(memberId).then((res) => res.data),
    onSuccess: () => {
      // 삭제 후 멤버 목록 갱신
      queryClient.invalidateQueries({ queryKey: membersQuery.all() });
    },
  });
};
