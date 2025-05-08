import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { dashboardsQuery } from '../dashboards/dashboards.query';
import {
  FindInvitationsRequest,
  UpdateInvitationsRequest,
  UpdateInvitationsResponse,
} from './invitations.schema';
import { invitationsService } from './invitations.service';

const invitationsQuery = {
  all: () => ['invitations'],
  invitationListKey: (params: FindInvitationsRequest) => [...invitationsQuery.all(), params],
  invitationList: (params: FindInvitationsRequest) =>
    infiniteQueryOptions({
      queryKey: invitationsQuery.invitationListKey(params),
      queryFn: async () =>
        await invitationsService.getMyInvitations(params).then((res) => res.data),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.cursorId,
      select: (data) => ({
        pages: data.pages.reverse(),
        pageParams: data.pageParams,
        allInvitations: data.pages.flatMap((page) => page.invitations),
      }),
    }),
};

/**
 * 내가 받은 초대 목록 조회 쿼리
 */
export const useInvitationsQuery = (params: FindInvitationsRequest) => {
  return useInfiniteQuery(invitationsQuery.invitationList(params));
};

/**
 * 초대 응답 뮤테이션
 */
export const useUpdateInvitationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateInvitationsResponse, Error, UpdateInvitationsRequest>({
    mutationFn: (data) => invitationsService.updateInvitation(data).then((res) => res.data),
    onSuccess: () => {
      // 업데이트 후 초대 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: invitationsQuery.all() });
      queryClient.invalidateQueries({ queryKey: dashboardsQuery.all() });
    },
  });
};
