import React from 'react';
import styles from '../styles/dashboard.module.scss';
import { CardType, ColumnType } from '../type';
import Image from 'next/image';
import Card from './Card';

type Props = {
  column: ColumnType;
};

function Column({ column }: Props) {
  const CARDS: CardType = {
    cursorId: 0,
    totalCount: 3,
    cards: [
      {
        id: 0,
        title: '새로운 일정 관리 Taskify',
        description: '설명입니다.',
        tags: ['프로젝트', '백엔드', '상'],
        dueDate: '2022.12.31',
        assignee: {
          profileImageUrl: 'images/codeit/codeit_lg.svg',
          nickname: '닉네임',
          id: 101,
        },
        imageUrl: '/images/landing/desktop/card_image1.png',
        teamId: 'string',
        columnId: 0,
        createdAt: '2025-04-23T13:15:04.012Z',
        updatedAt: '2025-04-23T13:15:04.012Z',
      },
      {
        id: 1,
        title: '새로운 일정 관리 Taskify',
        description: '설명입니다.',
        tags: ['프로젝트', '백엔드', '상'],
        dueDate: '2022.12.31',
        assignee: {
          profileImageUrl: 'images/codeit/codeit_lg.svg',
          nickname: '닉네임',
          id: 101,
        },
        imageUrl: '',
        teamId: 'string',
        columnId: 0,
        createdAt: '2025-04-23T13:15:04.012Z',
        updatedAt: '2025-04-23T13:15:04.012Z',
      },
      {
        id: 2,
        title: '새로운 일정 관리 Taskify',
        description: '설명입니다.',
        tags: ['프로젝트', '백엔드', '상'],
        dueDate: '2022.12.31',
        assignee: {
          profileImageUrl: 'images/codeit/codeit_lg.svg',
          nickname: '닉네임',
          id: 101,
        },
        imageUrl: '',
        teamId: 'string',
        columnId: 0,
        createdAt: '2025-04-23T13:15:04.012Z',
        updatedAt: '2025-04-23T13:15:04.012Z',
      },
    ],
  };

  return (
    <div className={styles.column}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h3 className={styles.title}>
            {column.title}
            <span>{CARDS.totalCount}</span>
          </h3>
          <button>
            <Image src="/icon/settings.svg" alt="관리" width={24} height={24} />
          </button>
        </div>
        <button className={styles.addBtn}>
          <span className={styles.imgWrap}>
            <Image src="/icon/add_color.svg" alt="추가 아이콘" fill />
          </span>
        </button>
        {CARDS?.cards.map((card) => <Card key={card.id} card={card} />)}
      </div>
    </div>
  );
}

export default Column;
