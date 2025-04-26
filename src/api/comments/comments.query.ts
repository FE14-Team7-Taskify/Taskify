// comments.query.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  FindCommentsRequest,
  FindCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from './comments.schema';
import { commentsService } from './comments.service';

// key 정의
const QUERY_KEYS = {
  comments: (cardId: number) => ['comments', cardId],
};

// region 댓글 생성
export const useCreateCommentMutation = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<CreateCommentResponse, Error, CreateCommentRequest>({
    mutationFn: (data) => commentsService.createComment(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(cardId) });
    },
  });
};
// endregion 댓글 생성

// region 댓글 목록 조회
export const useCommentsQuery = (params: FindCommentsRequest) => {
  return useQuery<FindCommentsResponse>({
    queryKey: QUERY_KEYS.comments(params.cardId),
    queryFn: () => commentsService.getComments(params).then((res) => res.data),
    enabled: !!params.cardId,
  });
};
// endregion 댓글 목록 조회

// region 댓글 수정
export const useUpdateCommentMutation = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCommentResponse, Error, UpdateCommentRequest>({
    mutationFn: (data) => commentsService.updateComment(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(cardId) });
    },
  });
};
// endregion 댓글 수정

// region 댓글 삭제
export const useDeleteCommentMutation = (cardId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (commentId) => commentsService.deleteComment(commentId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(cardId) });
    },
  });
};
// endregion 댓글 삭제
