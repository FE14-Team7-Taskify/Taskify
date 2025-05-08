'use client';

import { useInfiniteCardsQuery } from '@/api/cards/cards.query';
import { UpdateCardRequest } from '@/api/cards/cards.schema';
import ManageColumnModal from '@/components/modal/ManageColumnModal';
import { useOverlay } from '@/contexts/OverlayProvider';
import { cn, cond } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/dashboard.module.scss';
import { ColumnType } from '@/api/columns/columns.schema';
import Card from './Card';
import CardCreateModal from './modal/CardCreateModal';

interface Props {
  column: ColumnType;
  dashboardId: number;
  onCardDrop: (request: UpdateCardRequest) => void;
  handleClickEditColumn: (column: ColumnType) => void;
}

function Column({ column, dashboardId, onCardDrop, handleClickEditColumn }: Props) {
  const { overlay, close } = useOverlay();

  // Drag and Drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: UpdateCardRequest) => {
      const updatedItem = { ...item, columnId: column.id };
      onCardDrop(updatedItem);
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  }));

  // 무한 스크롤
  const { ref, inView } = useInView({ threshold: 0 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteCardsQuery({
    columnId: column.id,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handleClickCreateCard() {
    overlay(<CardCreateModal dashboardId={dashboardId} columnId={column.id} />);
  }

  if (typeof window === 'undefined') return null;
  if (!column || !column.id) return null;

  if (status === 'pending') return <div>데이터를 불러오는 중....</div>;
  if (status === 'error') return <div>에러가 발생했습니다</div>;

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
            <button onClick={() => handleClickEditColumn(column)}>
              <Image src="/icon/settings.svg" alt="관리" width={24} height={24} />
            </button>
          </div>
          <button onClick={handleClickCreateCard} className={styles.addBtn}>
            <span className={styles.imgWrap}>
              <Image src="/icon/add_color.svg" alt="추가 아이콘" fill />
            </span>
          </button>
          {allCards.map((card) => (
            <Card key={card.id} card={card} column={column} />
          ))}
          <div ref={ref}>{isFetchingNextPage && '불러오는 중...'}</div>
        </div>
      </div>
    );
  }
}

export default Column;
