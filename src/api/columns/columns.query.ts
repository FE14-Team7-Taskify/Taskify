import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateColumnRequest,
  CreateColumnResponse,
  UpdateColumnRequest,
  UpdateColumnResponse,
  UploadColumnImageRequest,
} from './columns.schema';
import { columnsService } from './columns.service';

const columnsQuery = {
  all: (dashboardId: number) => ['columns', dashboardId],
  columnListKey: (dashboardId: number) => [...columnsQuery.all(dashboardId)],
  columnList: (dashboardId: number) =>
    queryOptions({
      queryKey: columnsQuery.all(dashboardId),
      queryFn: () => columnsService.getColumns(dashboardId),
    }),
};

/**
 * 컬럼 목록 조회 쿼리
 */
export const useColumnsQuery = (dashboardId: number) => {
  return useQuery({
    ...columnsQuery.columnList(dashboardId),
    select: (res) => res.data,
    enabled: !!dashboardId,
  });
};

/**
 * 컬럼 생성 뮤테이션
 */
export const useCreateColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<CreateColumnResponse, Error, CreateColumnRequest>({
    mutationFn: (data) => columnsService.createColumn(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQuery.all(dashboardId) });
    },
  });
};
/**
 * 컬럼 수정 뮤테이션
 */
export const useUpdateColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateColumnResponse, Error, UpdateColumnRequest>({
    mutationFn: (data) => columnsService.updateColumn(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQuery.all(dashboardId) });
    },
  });
};
/**
 * 컬럼 삭제 뮤테이션
 */
export const useDeleteColumnMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (columnId) => columnsService.deleteColumn(columnId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQuery.all(dashboardId) });
    },
  });
};
/**
 * 카드 이미지 업로드 뮤테이션
 */
export const useUploadColumnImageMutation = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UploadColumnImageRequest>({
    mutationFn: (data) => columnsService.uploadCardImage(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnsQuery.all(dashboardId) });
    },
  });
};
