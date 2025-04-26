// columns.query.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { columnsService } from './columns.service';
import {
  CreateColumnRequest,
  CreateColumnResponse,
  FindColumnsResponse,
  UpdateColumnRequest,
  UpdateColumnResponse,
  UploadColumnImageRequest,
} from './columns.schema';

// key 정의
const QUERY_KEYS = {
  columns: (dashboardId: number) => ['columns', dashboardId],
};

// region 컬럼 생성
export const useCreateColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<CreateColumnResponse, Error, CreateColumnRequest>({
    mutationFn: (data) => columnsService.createColumn(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.columns(dashboardId) });
    },
  });
};
// endregion 컬럼 생성

// region 컬럼 목록 조회
export const useColumnsQuery = (dashboardId: number) => {
  return useQuery<FindColumnsResponse>({
    queryKey: QUERY_KEYS.columns(dashboardId),
    queryFn: () => columnsService.getColumns(dashboardId).then((res) => res.data),
    enabled: !!dashboardId,
  });
};
// endregion 컬럼 목록 조회

// region 컬럼 수정
export const useUpdateColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateColumnResponse, Error, UpdateColumnRequest>({
    mutationFn: (data) => columnsService.updateColumn(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.columns(dashboardId) });
    },
  });
};
// endregion 컬럼 수정

// region 컬럼 삭제
export const useDeleteColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (columnId) => columnsService.deleteColumn(columnId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.columns(dashboardId) });
    },
  });
};
// endregion 컬럼 삭제

// region 카드 이미지 업로드
export const useUploadColumnImageMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UploadColumnImageRequest>({
    mutationFn: (data) => columnsService.uploadCardImage(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.columns(dashboardId) });
    },
  });
};
// endregion 카드 이미지 업로드
