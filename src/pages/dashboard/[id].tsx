import { useRouter } from 'next/router';
import Column from './components/Column';
import styles from './styles/dashboard.module.scss';
import Image from 'next/image';
import { useColumnsQuery } from '@/api/columns/columns.query';

export default function DashBoard() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = typeof id === 'string' ? Number(id) : undefined;
  const { data, isLoading, isError } = useColumnsQuery(dashboardId);

  const openAddColumnModal = () => {
    console.log(`컬럼 추가 모달 - 대시보드 ID : ${id}`);
  };

  if (!dashboardId) return <div>잘못된 접근입니다.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>에러가 발생했습니다.</div>;

  if ('data' in data) {
    return (
      <>
        <div className={styles.dashboard}>
          <div className={styles.container}>
            {data?.data.map((column) => (
              <Column key={column.id} column={column} dashboardId={id as string} />
            ))}
            <div className={styles.addColumn}>
              <button className={styles.addBtn} onClick={openAddColumnModal}>
                새로운 컬럼 추가하기
                <Image src="/icon/add_color.svg" alt="추가 아이콘" width={22} height={22} />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>{data.message}</div>;
  }
}
