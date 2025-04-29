export type CommentType = {
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

export type CreateCommentRequest = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

export type CreateCommentResponse = CommentType;

export type FindCommentsRequest = { size?: number; cursorId?: number; cardId: number };

export type FindCommentsResponse = { cursorId: number; comments: CommentType[] };

export type UpdateCommentRequest = { commentId: number; content: string };

export type UpdateCommentResponse = CommentType;
