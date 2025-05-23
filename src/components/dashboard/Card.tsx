'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../pages/dashboard/styles/dashboard.module.scss';
import Image from 'next/image';
import Tag from '../../pages/dashboard/components/Tag';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CardType } from '@/api/cards/cards.schema';
import { cn, cond } from '@/styles/util/stylesUtil';
import { useOverlay } from '@/contexts/OverlayProvider';
import CardDetailModal from '../../pages/dashboard/components/modal/CardDetailModal';
import { ColumnType } from '@/api/columns/columns.schema';

interface CardProps {
  card: CardType;
  column?: ColumnType;
  isPreview?: boolean;
}

function Card({ card, column, isPreview = false }: CardProps) {
  const { overlay } = useOverlay();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'card',
    item: () => ({
      cardId: card?.id,
      fromColumnId: card?.columnId,
      assigneeUserId: card?.assignee?.id,
      profileImageUrl: card?.assignee?.profileImageUrl,
      title: card?.title,
      description: card?.description,
      dueDate: card?.dueDate,
      tags: card?.tags,
      imageUrl: card?.imageUrl,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [profileImg, setProfileImg] = useState(
    card?.assignee?.profileImageUrl || '/images/profile.svg',
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const handleImgError = () => {
    setProfileImg('/images/profile.svg');
  };

  const handleCardClick = () => {
    if (isPreview || !column) return;
    if (card?.id && column?.id && column?.title) {
      overlay(<CardDetailModal cardId={card.id} columnId={column.id} columnTitle={column.title} />);
    }
  };

  const shouldRender = typeof window !== 'undefined' && card && card.id;
  if (!shouldRender) return null;

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      className={cn(
        styles.card,
        cond(isPreview, styles.preview),
        cond(isDragging, styles.isDragging),
      )}
      onClick={handleCardClick}
    >
      {card.imageUrl && (
        <div className={styles.cardImg}>
          <Image src={card.imageUrl} alt="카드 썸네일" fill sizes="(max-width: 768px) 100%, 91px" />
        </div>
      )}
      <div className={styles.cardTxt}>
        <p className={styles.title}>{card.title}</p>
        <div className={styles.cardInfoWrap}>
          {card.tags && card.tags.length > 0 && (
            <div className={styles.tagWrap}>
              {card.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
          <div className={styles.cardInfo}>
            <div>
              {card.dueDate && (
                <span className={styles.date}>
                  <Image src="/icon/calendar.svg" alt="달력 아이콘" width={18} height={18} />
                  {card.dueDate}
                </span>
              )}
            </div>

            {card.assignee && (
              <span className={styles.profileImg}>
                <Image
                  src={profileImg}
                  alt="프로필"
                  width={22}
                  height={22}
                  onError={handleImgError}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
