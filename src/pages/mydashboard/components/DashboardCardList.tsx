import { useDashboardsQuery } from '@/api/dashboards/dashboards.query';
import { DashboardType } from '@/api/dashboards/dashboards.schema';
import Pagination from '@/components/common/button/Pagination';
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
          <Pagination currentPage={page} totalPage={totalPage} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
