import { cn } from '@/styles/util/stylesUtil';
import React from 'react';
import styles from '../styles/comments.module.scss';
import { useCommentsQuery } from '@/api/comments/comments.query';
import { CommentType } from '@/api/comments/comments.schema';
import Image from 'next/image';
import { useUser } from '@/contexts/AuthProvider';

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
  const pad = (n: number) => String(n).padStart(2, '0');

  const date = new Date(comment.createdAt);
  const dateFormat = `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return (
    <div className={cn(styles.commentWrap)}>
      <div className={cn(styles.commentInfo)}>
        <Image src={author.profileImageUrl as string} alt="프로필" width={34} height={34} />
        <span className={cn(styles.nickname)}>{author.nickname}</span>
        <span className={cn(styles.date)}>{dateFormat}</span>
      </div>
      <p className={cn(styles.comment)}>{comment.content}</p>
      {user?.id === author.id && (
        <div className={cn(styles.commentControls)}>
          <button>수정</button>
          <button>삭제</button>
        </div>
      )}
    </div>
  );
}

function Comments({ cardId, columnId, dashboardId }: comments) {
  const { data } = useCommentsQuery({ cardId });

  console.log(data?.comments);

  return (
    <div className={cn(styles.commentArea)}>
      <p>댓글</p>
      <form className={cn(styles.commentForm)}>
        <textarea className={cn(styles.commentInput)} placeholder="댓글 작성하기"></textarea>
        <button type="submit">입력</button>
      </form>
      <div className={cn(styles.commentsList)}>
        {data?.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}

export default Comments;
