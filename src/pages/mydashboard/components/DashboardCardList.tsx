import { useDashboardsQuery } from '@/api/dashboards/dashboards.query';
import { DashboardType } from '@/api/dashboards/dashboards.schema';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/mydashboard.module.scss';
import CreateDashboardButton from './card/CreateDashboardButton';
import DashboardCard from './card/DashboardCard';

export default function DashboardCardList() {
  const [page, setPage] = useState<number>(1);
  const { isSuccess, data: dashboardsResult } = useDashboardsQuery({
    navigationMethod: 'pagination',
    size: 5,
    page,
  });
  const totalPage = Math.ceil((dashboardsResult?.totalCount || 5) / 5);

  return (
    <div className={styles.cardListContainer}>
      <div className={styles.cardListWrapper}>
        <CreateDashboardButton />
        {isSuccess &&
          dashboardsResult.dashboards?.map((dashboard: DashboardType) => (
            <DashboardCard key={dashboard.id} {...dashboard} />
          ))}
      </div>
      {isSuccess && dashboardsResult.dashboards?.length > 0 && (
        <div className={styles.paginationArea}>
          {totalPage} 페이지 중 {page}
          <div className={styles.paginationBtns}>
            <button
              className={styles.btnLeft}
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <Image
                src="/icon/arrow_right.svg"
                alt="내 대시보드 카드 이전 페이지 아이콘"
                width={16}
                height={16}
              />
            </button>
            <button
              className={styles.btnRight}
              disabled={page === totalPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <Image
                src="/icon/arrow_right.svg"
                alt="내 대시보드 카드 다음 페이지 아이콘"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
