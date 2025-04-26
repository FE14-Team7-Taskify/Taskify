// dashboards.query.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateInvitationRequest,
  CreateInvitationResponse,
  DeleteInvitationRequest,
  FindDashboardsRequest,
  FindDashboardsResponse,
  GetDashboardResponse,
  GetInvitationsRequest,
  GetInvitationsResponse,
  UpdateDashboardRequest,
  UpdateDashboardResponse,
} from './dashboards.schema';
import { dashboardsService } from './dashboards.service';

// key 정의
const QUERY_KEYS = {
  dashboards: ['dashboards'],
  dashboardDetail: (dashboardId: number) => ['dashboard', dashboardId],
  invitations: (dashboardId: number) => ['invitations', dashboardId],
};

// region 대시보드 생성
export const useCreateDashboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateDashboardResponse, Error, CreateDashboardRequest>({
    mutationFn: (data) => dashboardsService.createDashboard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboards });
    },
  });
};
// endregion 대시보드 생성

// region 대시보드 목록 조회
export const useDashboardsQuery = (params: FindDashboardsRequest) => {
  return useQuery<FindDashboardsResponse>({
    queryKey: QUERY_KEYS.dashboards,
    queryFn: () => dashboardsService.getDashboards(params).then((res) => res.data),
  });
};
// endregion 대시보드 목록 조회

// region 대시보드 상세 조회
export const useDashboardDetailQuery = (dashboardId: number) => {
  return useQuery<GetDashboardResponse>({
    queryKey: QUERY_KEYS.dashboardDetail(dashboardId),
    queryFn: () => dashboardsService.getDashboardDetail(dashboardId).then((res) => res.data),
    enabled: !!dashboardId,
  });
};
// endregion 대시보드 상세 조회

// region 대시보드 수정
export const useUpdateDashboardMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateDashboardResponse, Error, UpdateDashboardRequest>({
    mutationFn: (data) => dashboardsService.updateDashboard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboardDetail(dashboardId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboards });
    },
  });
};
// endregion 대시보드 수정

// region 대시보드 삭제
export const useDeleteDashboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (dashboardId) =>
      dashboardsService.deleteDashboard(dashboardId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboards });
    },
  });
};
// endregion 대시보드 삭제

// region 대시보드 초대하기
export const useCreateInvitationMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<CreateInvitationResponse, Error, CreateInvitationRequest>({
    mutationFn: (data) => dashboardsService.createInvitation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitations(dashboardId) });
    },
  });
};
// endregion 대시보드 초대하기

// region 대시보드 초대 불러오기
export const useInvitationsQuery = (params: GetInvitationsRequest) => {
  return useQuery<GetInvitationsResponse>({
    queryKey: QUERY_KEYS.invitations(params.dashboardId),
    queryFn: () => dashboardsService.getInvitations(params).then((res) => res.data),
    enabled: !!params.dashboardId,
  });
};
// endregion 대시보드 초대 불러오기

// region 대시보드 초대 취소
export const useDeleteInvitationMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteInvitationRequest>({
    mutationFn: (data) => dashboardsService.deleteInvitation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitations(dashboardId) });
    },
  });
};
// endregion 대시보드 초대 취소
