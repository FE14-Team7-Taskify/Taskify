import { useCardDetailQuery, useDeleteCardMutation } from '@/api/cards/cards.query';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { useOverlay } from '@/contexts/OverlayProvider';
import React, { useState } from 'react';
import styles from '../../styles/cardDetailModal.module.scss';
import { cn } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { ColumnType } from '../../type';
import Tag from '../Tag';
import Comments from '../Comments';
import { useRouter } from 'next/router';

interface Props {
  cardId: number;
  column: ColumnType;
}

function CardDetailModal({ cardId, column }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = typeof id === 'string' ? Number(id) : 0;
  const { close } = useOverlay();
  const { data, isLoading, error } = useCardDetailQuery(cardId);
  const mutation = useDeleteCardMutation();

  const [kebabOpen, setKebabOpen] = useState(false);

  if (isLoading) return <div>Loading..</div>;
  if (error || !data) return <div>에러</div>;

  const handleEditCard = () => {
    console.log('할 일 카드 수정 모달');
  };

  const handleDeleteCard = () => {
    mutation.mutate(cardId, {
      onSuccess: () => {
        close();
        alert('카드가 삭제되었습니다.');
      },
    });
  };

  return (
    <ModalWrapper>
      <div className={cn(styles.cardDetail)}>
        <div className={cn(styles.cardHeader)}>
          <div className={cn(styles.btnWrap)}>
            <button
              className={cn(styles.iconBtn, styles.kebab)}
              onClick={() => setKebabOpen((prev) => !prev)}
            ></button>
            {kebabOpen && (
              <div className={cn(styles.dropdown)}>
                <button onClick={handleEditCard}>수정하기</button>
                <button onClick={handleDeleteCard}>삭제하기</button>
              </div>
            )}
            <button className={cn(styles.iconBtn, styles.closeBtn)} onClick={close}></button>
          </div>
          <h4 className={cn(styles.cardTitle)}>{data.title}</h4>
        </div>
        <div className={cn(styles.cardMetaBox)}>
          <div className={cn(styles.meta)}>
            <span className={cn(styles.metaTitle)}>담당자</span>
            <div className={cn(styles.metaTxt)}>
              <Image
                src={data?.assignee.profileImageUrl as string}
                width={26}
                height={26}
                alt="프로필"
              />
              <span>{data?.assignee.nickname}</span>
            </div>
          </div>
          <div className={cn(styles.meta)}>
            <span className={cn(styles.metaTitle)}>마감일</span>
            <div className={cn(styles.metaTxt)}>{data.dueDate}</div>
          </div>
        </div>
        <div className={cn(styles.cardLabel)}>
          <div className={styles.teskColumn}>{data.columnId === column.id && column.title}</div>
          {data.tags && (
            <div className={cn(styles.tagWrap)}>
              {data.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
        </div>
        <div className={cn(styles.description)}>{data.description}</div>
        {data.imageUrl && (
          <div className={cn(styles.imgWrap)}>
            <Image src={data.imageUrl as string} alt="카드 썸네일" fill />
          </div>
        )}
        <Comments cardId={data.id} columnId={data.columnId} dashboardId={dashboardId} />
      </div>
    </ModalWrapper>
  );
}

export default CardDetailModal;
