import React from 'react';
import { Cards } from '../type';
import styles from '../styles/dashboard.module.scss';
import Image from 'next/image';
import Tag from './Tag';

type Props = {
  card: Cards;
};

function Card({ card }: Props) {
  return (
    <div className={styles.card}>
      {card.imageUrl && (
        <div className={styles.cardImg}>
          <Image
            src={card.imageUrl}
            alt="카드 썸네일"
            layout="responsive"
            width={274}
            height={160}
          />
        </div>
      )}
      <div className={styles.cardTxt}>
        <p className={styles.title}>{card.title}</p>
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
            <Image src={card.assignee.profileImageUrl} alt="프로필" fill />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
