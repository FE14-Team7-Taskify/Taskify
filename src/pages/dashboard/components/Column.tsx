import React, { useEffect } from 'react';
import styles from '../styles/dashboard.module.scss';
import { ColumnType } from '../type';
import Image from 'next/image';
import Card from './Card';
import { useInfiniteCardsQuery } from '@/api/cards/cards.query';
import { useInView } from 'react-intersection-observer';
import { useDrop } from 'react-dnd';
import { UpdateCardRequest } from '@/api/cards/cards.schema';
import { cn, cond } from '@/styles/util/stylesUtil';

interface Props {
  column: ColumnType;
  dashboardId: string;
  onCardDrop: (request: UpdateCardRequest) => void;
}

function Column({ column, dashboardId, onCardDrop }: Props) {
  // Drag and Drop
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: UpdateCardRequest) => {
      const updatedItem = {
        ...item,
        columnId: column.id,
      };
      onCardDrop(updatedItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // 무한 스크롤
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteCardsQuery({
    columnId: column.id,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모달 연결 (예정)
  const openEditColumnModal = () => {
    console.log(`컬럼 수정 모달 - 컬럼 ID : ${column.id}`);
  };

  const openAddCardModal = () => {
    console.log(`할 일 생성 모달 - 대시보드 ID : ${dashboardId} / 컬럼 ID : ${column.id}`);
  };

  if (status === 'pending') return <div>데이터를 불러오는 중....</div>;
  if (status === 'error') return <div>에러가 발생했습니다</div>;

  if (data && data.pages.length > 0) {
    const firstPage = data.pages[0];

    if ('totalCount' in firstPage) {
      const allCards = data.pages.flatMap((page) => {
        if ('cards' in page) {
          return page.cards;
        }
        return [];
      });

      return (
        <div
          ref={(node) => {
            if (node) drop(node);
          }}
          className={cn(styles.column, cond(isOver, styles.isOver))}
        >
          <div className={styles.inner}>
            <div className={styles.head}>
              <h3 className={styles.title}>
                {column.title}
                <span>{firstPage.totalCount || 0}</span>
              </h3>
              <button onClick={openEditColumnModal}>
                <Image src="/icon/settings.svg" alt="관리" width={24} height={24} />
              </button>
            </div>
            <button onClick={openAddCardModal} className={styles.addBtn}>
              <span className={styles.imgWrap}>
                <Image src="/icon/add_color.svg" alt="추가 아이콘" fill />
              </span>
            </button>
            {allCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
            <div ref={ref}>{isFetchingNextPage ? '불러오는 중...' : ''}</div>
          </div>
        </div>
      );
    }
  }

  return null;
}

export default Column;
