import React, { useEffect } from 'react';
import styles from '../styles/dashboard.module.scss';
import Image from 'next/image';
import Tag from './Tag';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CardType } from '@/api/cards/cards.schema';
import { cn, cond } from '@/styles/util/stylesUtil';

interface CardProps {
  card: CardType;
  isPreview?: boolean;
}

function Card({ card, isPreview = false }: CardProps) {
  // Drag and Drop
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'card',
    item: {
      cardId: card.id,
      fromColumnId: card.columnId,
      assigneeUserId: card.assignee.id,
      profileImageUrl: card.assignee.profileImageUrl,
      title: card.title,
      description: card.description,
      dueDate: card.dueDate,
      tags: card.tags,
      imageUrl: card.imageUrl,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // 모달 연결 (예정)
  const handleCardClick = () => {
    if (isPreview) return;
    console.log(`할 일 카드 상세 모달 - 카드 ID : ${card.id}`);
  };

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
          {card.tags && (
            <div className={styles.tagWrap}>
              {card?.tags.map((tag) => <Tag key={tag} name={tag} />)}
            </div>
          )}
          <div className={styles.cardInfo}>
            <span className={styles.date}>
              <Image src="/icon/calendar.svg" alt="달력 아이콘" width={18} height={18} />
              {card.dueDate}
            </span>
            <span className={styles.profileImg}>
              <Image
                src={card.assignee.profileImageUrl as string}
                alt="프로필"
                width={22}
                height={22}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
