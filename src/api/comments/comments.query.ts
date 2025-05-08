import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  FindCommentsRequest,
  FindCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from './comments.schema';
import { commentsService } from './comments.service';

const commentsQuery = {
  all: (cardId: number) => ['comments', cardId],
  commentListKey: (params: FindCommentsRequest) => [...commentsQuery.all(params.cardId), params],
  commentList: (params: FindCommentsRequest) =>
    queryOptions({
      queryKey: commentsQuery.all(params.cardId),
      queryFn: () => commentsService.getComments(params).then((res) => res.data),
    }),
};
/**
 * 댓글 목록 조회 쿼리
 */
export const useCommentsQuery = (params: FindCommentsRequest) => {
  return useInfiniteQuery<FindCommentsResponse>({
    queryKey: commentsQuery.commentListKey(params),
    queryFn: ({ pageParam }) =>
      commentsService
        .getComments({ ...params, cursorId: pageParam as number | undefined })
        .then((res) => res.data),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return 'cursorId' in lastPage ? lastPage.cursorId : undefined;
    },
  });
};

/**
 * 댓글 생성 뮤테이션
 */
export const useCreateCommentMutation = (cardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<CreateCommentResponse, Error, CreateCommentRequest>({
    mutationFn: (data) => commentsService.createComment(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsQuery.all(cardId) });
    },
  });
};
/**
 * 댓글 수정 뮤테이션
 */
export const useUpdateCommentMutation = (cardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateCommentResponse, Error, UpdateCommentRequest>({
    mutationFn: (data) => commentsService.updateComment(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsQuery.all(cardId) });
    },
  });
};
/**
 * 댓글 삭제 뮤테이션
 */
export const useDeleteCommentMutation = (cardId: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (commentId) => commentsService.deleteComment(commentId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsQuery.all(cardId) });
    },
  });
};
