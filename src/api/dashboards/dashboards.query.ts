// dashboards.query.ts
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateInvitationRequest,
  CreateInvitationResponse,
  DeleteInvitationRequest,
  FindDashboardsRequest,
  GetInvitationsRequest,
  UpdateDashboardRequest,
  UpdateDashboardResponse,
} from './dashboards.schema';
import { dashboardsService } from './dashboards.service';

// key 정의
const dashboardQuery = {
  all: () => ['dashboards'],

  dashboardKey: (params: FindDashboardsRequest) => [dashboardQuery.all(), params],
  dashboard: (params: FindDashboardsRequest) =>
    queryOptions({
      queryKey: dashboardQuery.dashboardKey(params),
      queryFn: () => dashboardsService.getDashboards(params),
    }),

  dashboardDetailKey: (dashboardId: number) => [dashboardQuery.all(), 'dashboard', dashboardId],
  dashboardDetail: (dashboardId: number) =>
    queryOptions({
      queryKey: dashboardQuery.dashboardDetailKey(dashboardId),
      queryFn: () => dashboardsService.getDashboardDetail(dashboardId),
    }),

  invitationsKey: (params: GetInvitationsRequest) => [dashboardQuery.all(), 'invitations', params],
  invitations: (params: GetInvitationsRequest) =>
    queryOptions({
      queryKey: dashboardQuery.invitationsKey(params),
      queryFn: () => dashboardsService.getInvitations(params),
    }),
};

// region 대시보드 목록 조회
export const useDashboardsQuery = (params: FindDashboardsRequest) => {
  return useQuery({
    ...dashboardQuery.dashboard(params),
    select: (res) => res.data,
  });
};
// endregion 대시보드 목록 조회

// region 대시보드 상세 조회
export const useDashboardDetailQuery = (dashboardId: number) => {
  return useQuery({
    ...dashboardQuery.dashboardDetail(dashboardId),
    enabled: !!dashboardId,
    select: (res) => res.data,
  });
};

// region 대시보드 초대 불러오기
export const useInvitationsQuery = (params: GetInvitationsRequest) => {
  return useQuery({
    ...dashboardQuery.invitations(params),
    enabled: !!params.dashboardId,
    select: (res) => res.data,
  });
};
// endregion 대시보드 초대 불러오기

// region 대시보드 생성
export const useCreateDashboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateDashboardResponse, Error, CreateDashboardRequest>({
    mutationFn: (data) => dashboardsService.createDashboard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQuery.all() });
    },
  });
};

// region 대시보드 초대 취소
export const useDeleteInvitationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteInvitationRequest>({
    mutationFn: (data) => dashboardsService.deleteInvitation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQuery.all() });
    },
  });
};
// endregion 대시보드 초대 취소

// region 대시보드 수정
export const useUpdateDashboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateDashboardResponse, Error, UpdateDashboardRequest>({
    mutationFn: (data) => dashboardsService.updateDashboard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQuery.all() });
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
      queryClient.invalidateQueries({ queryKey: dashboardQuery.all() });
    },
  });
};
// endregion 대시보드 삭제

// region 대시보드 초대하기
export const useCreateInvitationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateInvitationResponse, Error, CreateInvitationRequest>({
    mutationFn: (data) => dashboardsService.createInvitation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQuery.all() });
    },
  });
};
