// dashboards.query.ts
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
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

export const dashboardsQuery = {
  all: () => ['dashboards'],
  // ✅ 기존
  dashboardListKey: (params: FindDashboardsRequest) => [...dashboardsQuery.all(), 'list', params],
  dashboardList: (params: FindDashboardsRequest) =>
    queryOptions({
      queryKey: dashboardsQuery.dashboardListKey(params),
      queryFn: () => dashboardsService.getDashboards(params),
    }),
  // ✅ 새로 추가: 사이드바 전용 쿼리
  sidebarKey: (page: number) => [...dashboardsQuery.all(), 'sidebar', page],
  sidebarList: (page: number) =>
    queryOptions({
      queryKey: dashboardsQuery.sidebarKey(page),
      queryFn: () =>
        dashboardsService.getDashboards({
          navigationMethod: 'pagination',
          size: 10,
          page,
        }),
      select: (res) => res.data,
    }),
  dashboardDetailKey: (dashboardId: number) => [...dashboardsQuery.all(), 'detail', dashboardId],
  dashboardDetail: (dashboardId: number) =>
    queryOptions({
      queryKey: dashboardsQuery.dashboardDetailKey(dashboardId),
      queryFn: () => dashboardsService.getDashboardDetail(dashboardId),
    }),
  invitationListKey: (params: GetInvitationsRequest) => [
    ...dashboardsQuery.all(),
    'invitations',
    params,
  ],
  invitationList: (params: GetInvitationsRequest) =>
    queryOptions({
      queryKey: dashboardsQuery.invitationListKey(params),
      queryFn: () => dashboardsService.getInvitations(params),
    }),
};
/**
 * 대시보드 목록 조회 쿼리
 */
export const useDashboardsQuery = (params: FindDashboardsRequest) =>
  useQuery({
    ...dashboardsQuery.dashboardList(params),
    select: (res) => res.data,
  });
/**
 * 사이드바 대시보드 목록 조회 쿼리
 */
export const useSidebarDashboardsQuery = (page: number) =>
  useQuery({
    ...dashboardsQuery.sidebarList(page),
    select: (res) => res.data,
  });
/**
 * 대시보드 상세 조회 쿼리
 */
export const useDashboardDetailQuery = (dashboardId: number) =>
  useQuery({
    ...dashboardsQuery.dashboardDetail(dashboardId),
    select: (res) => res.data,
    enabled: !!dashboardId,
  });
/**
 * 대시보드 초대 불러오기 쿼리
 */
export const useInvitationsQuery = (params: GetInvitationsRequest) => {
  return useQuery({
    ...dashboardsQuery.invitationList(params),
    select: (res) => res.data,
    enabled: !!params.dashboardId,
  });
};

/**
 * 대시보드 생성 뮤테이션
 */
export const useCreateDashboardMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<CreateDashboardResponse, Error, CreateDashboardRequest>({
    mutationFn: (data) => dashboardsService.createDashboard(data).then((res) => res.data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: dashboardsQuery.all(), exact: false });
      router.push(`/dashboard/${result.id}`);
    },
  });
};
/**
 * 대시보드 수정 뮤테이션
 */
export const useUpdateDashboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateDashboardResponse, Error, UpdateDashboardRequest>({
    mutationFn: (data) => dashboardsService.updateDashboard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardsQuery.all(), exact: false });
      // queryClient.invalidateQueries({ queryKey: dashboardsQuery.dashboardDetailKey(dashboardId) });
    },
  });
};
/**
 * 대시보드 삭제 뮤테이션
 */
export const useDeleteDashboardMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (dashboardId) =>
      dashboardsService.deleteDashboard(dashboardId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardsQuery.all(), exact: false });
      router.push('/mydashboard');
    },
  });
};
/**
 * 대시보드 초대하기 뮤테이션
 */
export const useCreateInvitationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateInvitationResponse, Error, CreateInvitationRequest>({
    mutationFn: (data) => dashboardsService.createInvitation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardsQuery.all() });
    },
  });
};
/**
 * 대시보드 초대 취소 뮤테이션
 */
export const useDeleteInvitationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteInvitationRequest>({
    mutationFn: (data) => dashboardsService.deleteInvitation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardsQuery.all() });
    },
  });
};
