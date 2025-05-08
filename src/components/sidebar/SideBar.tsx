import { useOverlay } from '@/contexts/OverlayProvider';
import { cn, cond } from '@/styles/util/stylesUtil';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Pagination from '../common/button/pagination/Pagination';
import CreateDashboardModal from '../modal/CreateDashboardModal';
import styles from './sidebar.module.scss';
import { useSidebarDashboardsQuery } from '@/api/dashboards/dashboards.query';

export default function SideBar({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { overlay, close } = useOverlay();
  const [page, setPage] = useState(1);

  const { isSuccess, data } = useSidebarDashboardsQuery(page);
  const totalCount = data?.totalCount || 0;
  const dashboards = data?.dashboards || [];

  const totalPage = Math.ceil(totalCount / 10) || 1;
  const firstDashboardId = dashboards?.[0]?.id;
  const nextPathname = firstDashboardId ? `/dashboard/${firstDashboardId}` : '/mydashboard';
  function handleClickLogo() {
    router.push(nextPathname);
  }

  function handelClickCreateBtn() {
    overlay(<CreateDashboardModal onClose={close} />);
  }

  function handleClickCard(dashboardId: number) {
    router.push(`/dashboard/${dashboardId}`);
  }

  const pathname = usePathname();
  const isCurrentDashboard = (dashboardId: number) => {
    const match = pathname?.match(/^\/dashboard\/(\d+)(\/|$)/);
    return match?.[1] === String(dashboardId);
  };

  useEffect(() => {
    if (isSuccess && pathname === '/') router.replace(nextPathname);
  }, [pathname, isSuccess, router]);

  return (
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
            <button onClick={handelClickCreateBtn}>
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
                dashboards.map((dashboard) => (
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
              {isSuccess && !!dashboards.length && (
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
