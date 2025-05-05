import { cn } from '@/styles/util/stylesUtil';
import React, { useState } from 'react';
import styles from '../styles/comments.module.scss';
import {
  useCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '@/api/comments/comments.query';
import { CommentType } from '@/api/comments/comments.schema';
import Image from 'next/image';
import { useUser } from '@/contexts/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';

interface comments {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

interface comment {
  comment: CommentType;
}

function Comment({ comment }: comment) {
  const author = comment.author;
  const user = useUser();
  const commentDeleteMutation = useDeleteCommentMutation(comment.id);
  const queryClient = useQueryClient();

  const [isEditing, setIsEdting] = useState(false);
  const INIT_VALUES = {
    commentId: comment.id,
    content: comment.content,
  };
  const [values, setValues] = useState(INIT_VALUES);
  const commentUpdateMutation = useUpdateCommentMutation(comment.id);

  const pad = (n: number) => String(n).padStart(2, '0');
  const date = new Date(comment.createdAt);
  const dateFormat = `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;

  const handleDeleteComment = () => {
    commentDeleteMutation.mutate(comment.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['comments', comment.cardId],
        });
      },
    });
  };

  const handleEditComment = () => {
    setIsEdting(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setValues((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentUpdateMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['comments', comment.cardId],
        });
      },
    });
    setIsEdting(false);
  };

  const handleCancelEdit = () => {
    setValues(INIT_VALUES);
    setIsEdting(false);
  };

  return (
    <div className={cn(styles.commentWrap)}>
      <div className={cn(styles.commentInfo)}>
        <Image src={author.profileImageUrl as string} alt="프로필" width={34} height={34} />
        <span className={cn(styles.nickname)}>{author.nickname}</span>
        <span className={cn(styles.date)}>{dateFormat}</span>
      </div>
      {isEditing && (
        <form className={cn(styles.commentForm, styles.commentEdit)} onSubmit={handleSubmit}>
          <textarea
            className={cn(styles.commentInput)}
            value={values.content}
            onChange={handleInputChange}
          ></textarea>
          <button
            type="submit"
            className={cn(styles.editBtn, styles.editing)}
            disabled={!values.content.trim()}
          >
            수정
          </button>
          <button type="button" className={cn(styles.editing)} onClick={handleCancelEdit}>
            취소
          </button>
        </form>
      )}
      {isEditing || <p className={cn(styles.comment)}>{comment.content}</p>}
      {user?.id === author.id && !isEditing && (
        <div className={cn(styles.commentControls)}>
          <button type="button" onClick={handleEditComment}>
            수정
          </button>
          <button type="button" onClick={handleDeleteComment}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

function Comments({ cardId, columnId, dashboardId }: comments) {
  const { data } = useCommentsQuery({ cardId });
  const INITIAL_VALUES = {
    content: '',
    cardId,
    columnId,
    dashboardId,
  };
  const [values, setValues] = useState(INITIAL_VALUES);
  const createCommentMutation = useCreateCommentMutation(cardId);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setValues((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation.mutate(values);
    setValues(INITIAL_VALUES);
  };

  return (
    <div className={cn(styles.commentArea)}>
      <p>댓글</p>
      <form className={cn(styles.commentForm)} onSubmit={handleSubmit}>
        <textarea
          className={cn(styles.commentInput)}
          placeholder="댓글 작성하기"
          onChange={handleInputChange}
          value={values.content}
        ></textarea>
        <button type="submit" disabled={!values.content.trim()}>
          입력
        </button>
      </form>
      <div className={cn(styles.commentsList)}>
        {data?.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}

export default Comments;
