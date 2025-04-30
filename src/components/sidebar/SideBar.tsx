import Image from 'next/image';
import styles from './sidebar.module.scss';
import { useUser } from '@/contexts/AuthProvider';

export default function SideBar({ children }: { children?: React.ReactNode }) {
  const user = useUser();
  return !user ? (
    <>{children}</>
  ) : (
    <div className={styles.sidebarWrapper}>
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
      <div className={styles.componentWrapper}>{children}</div>
    </div>
  );
}
