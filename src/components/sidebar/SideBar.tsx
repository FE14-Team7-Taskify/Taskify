import { useDashboardsQuery } from '@/api/dashboards/dashboards.query';
import { useUser } from '@/contexts/AuthProvider';
import { cn, cond } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Pagination from '../common/button/Pagination';
import styles from './sidebar.module.scss';

export default function SideBar({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  function handleClickLogo() {
    router.push('/');
  }
  function handleClickCard(dashboardId: number) {
    router.push(`/dashboard/${dashboardId}`);
  }

  const [page, setPage] = useState<number>(1);
  const { isSuccess, data } = useDashboardsQuery({
    navigationMethod: 'pagination',
    size: 10,
    page,
  });
  const totalPage = Math.ceil((data?.totalCount || 10) / 10);

  const pathname = usePathname();
  const isCurrentDashboard = (dashboardId: number) =>
    pathname.startsWith(`/dashboard/${dashboardId}`);

  const user = useUser();

  return !user ? (
    <>{children}</>
  ) : (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarContainer}>
        <button
          className={styles.logoArea}
          aria-description="로고 이미지 영역"
          onClick={handleClickLogo}
        />
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
          <div className={styles.cardsContent}>
            <div className={styles.cardList}>
              {isSuccess &&
                data.dashboards?.map((dashboard) => (
                  <button
                    key={`sidebar-dashboard-row-${dashboard.id}`}
                    className={cn(
                      styles.cardRow,
                      cond(isCurrentDashboard(dashboard.id), styles.cardRowActive),
                    )}
                    onClick={() => handleClickCard(dashboard.id)}
                  >
                    <div
                      className={cn(
                        styles.dashboardColor,
                        styles[`color-${dashboard.color.replace('#', '')}`],
                      )}
                    />
                    <div
                      className={cn(
                        styles.dashboardTitle,
                        cond(dashboard.createdByMe, styles.dashboardCrown),
                      )}
                    >
                      {dashboard.title}
                    </div>
                  </button>
                ))}
            </div>
            <div className={styles.cardPagination}>
              {isSuccess && (
                <Pagination totalPage={totalPage} currentPage={page} setPage={setPage} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.componentWrapper}>{children}</div>
    </div>
  );
}
