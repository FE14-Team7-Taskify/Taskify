import React from 'react';
import styles from '../styles/dashboard.module.scss';
import { ColumnType } from '../type';
import Image from 'next/image';
import Card from './Card';
import { useCardsQuery } from '@/api/cards/cards.query';

type Props = {
  column: ColumnType;
  dashboardId: string;
};

function Column({ column, dashboardId }: Props) {
  const { data } = useCardsQuery({ columnId: column.id });

  const openEditColumnModal = () => {
    console.log(`컬럼 수정 모달 - 컬럼 ID : ${column.id}`);
  };

  const openAddCardModal = () => {
    console.log(`할 일 생성 모달 - 대시보드 ID : ${dashboardId} / 컬럼 ID : ${column.id}`);
  };

  if (data && 'cards' in data) {
    return (
      <div className={styles.column}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <h3 className={styles.title}>
              {column.title}
              <span>{data?.totalCount}</span>
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
          {data?.cards.map((card) => <Card key={card.id} card={card} />)}
        </div>
      </div>
    );
  } else {
    return <div>{data?.message}</div>;
  }
}

export default Column;
