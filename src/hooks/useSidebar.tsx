import { useDashboardsQuery } from '@/api/dashboards/dashboards.query';
import { useState } from 'react';

export default function useSidebar() {
  const [page, setPage] = useState(1);

  const { isSuccess, data, refetch, isFetching } = useDashboardsQuery({
    navigationMethod: 'pagination',
    size: 10,
    page,
  });

  return {
    dashboards: data?.dashboards ?? [],
    totalCount: data?.totalCount ?? 0,
    isSuccess,
    isFetching,
    updateSidebarList: refetch,
    page,
    setPage,
  };
}
