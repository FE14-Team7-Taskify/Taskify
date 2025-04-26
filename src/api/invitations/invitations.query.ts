import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FindInvitationsRequest,
  FindInvitationsResponse,
  UpdateInvitationsRequest,
  UpdateInvitationsResponse,
} from './invitations.schema';
import { invitationsService } from './invitations.service';

// key 정의
const QUERY_KEYS = {
  invitations: ['invitations'],
};

// region 내가 받은 초대 목록 조회
export const useInvitationsQuery = (params: FindInvitationsRequest) => {
  return useQuery<FindInvitationsResponse>({
    queryKey: [...QUERY_KEYS.invitations, params],
    queryFn: () => invitationsService.getMyInvitations(params).then((res) => res.data),
  });
};
// endregion 내가 받은 초대 목록 조회

// region 초대 응답
export const useUpdateInvitationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateInvitationsResponse, Error, UpdateInvitationsRequest>({
    mutationFn: (data) => invitationsService.updateInvitation(data).then((res) => res.data),
    onSuccess: () => {
      // 업데이트 후 초대 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitations });
    },
  });
};
// endregion 초대 응답
