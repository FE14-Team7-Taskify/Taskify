import { useDashboardsQuery } from '@/api/dashboards/dashboards.query';
import { DashboardType } from '@/api/dashboards/dashboards.schema';
import { useState } from 'react';
import styles from '../styles/mydashboard.module.scss';

export default function DashboardCards() {
  const [page, setPage] = useState<number>(1);
  const { isSuccess, data: dashboardsResult } = useDashboardsQuery({
    navigationMethod: 'pagination',
    size: 5,
    page,
  });

  return (
    <div className={styles.myDashboardsContainer}>
      <button>새로운 대시보드</button>
      {isSuccess &&
        dashboardsResult.dashboards?.map((dashboard: DashboardType) => (
          <button className={dashboard.createdByMe ? '' : ''} key={dashboard.id}>
            {dashboard.title}
          </button>
        ))}
    </div>
  );
}
