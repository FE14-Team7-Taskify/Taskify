import api from '@/lib/axios';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  FindCommentsRequest,
  FindCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from './comments.schema';

const PATH = '/comments';

class CommentsService {
  createComment(body: CreateCommentRequest) {
    return api.post<CreateCommentResponse>(PATH, body);
  }
  getComments(params: FindCommentsRequest) {
    return api.get<FindCommentsResponse>(PATH, { params });
  }
  updateComment({ commentId, ...body }: UpdateCommentRequest) {
    return api.put<UpdateCommentResponse>(`${PATH}/${commentId}`, body);
  }
  deleteComment(commentId: number) {
    return api.delete(`${PATH}/${commentId}`);
  }
}

export const commentsService = new CommentsService();
