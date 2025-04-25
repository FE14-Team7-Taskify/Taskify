export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
};

export type CommentResponse = Comment | { message: string };

export type CreateCommentRequest = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

export type CreateCommentResponse = CommentResponse;

export type FindCommentsRequest = { size?: number; cursorId?: number; cardId: number };

export type FindCommentsResponse = { cursorId: number; comments: Comment[] } | { message: string };

export type UpdateCommentRequest = { commentId: number; content: string };

export type UpdateCommentResponse = CommentResponse;
