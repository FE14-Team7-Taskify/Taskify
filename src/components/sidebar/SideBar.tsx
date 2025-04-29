import Image from 'next/image';
import styles from './sidebar.module.scss';

export default function SideBar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoArea} aria-description="로고 이미지 영역" />
      <div className={styles.cardsContainer}>
        <div className={styles.cardsHeader}>
          <h6>Dash Boards</h6>
          <button>
            <Image
              src="/icon/add_box.svg"
              alt="대시보드 생성 바로가기 아이콘"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
