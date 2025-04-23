import Column from './components/Column';
import styles from './styles/dashboard.module.scss';
import { ColumnType } from './type';
import Image from 'next/image';

export default function DashBoard() {
  const COLUMNS: { result: string; data: ColumnType[] } = {
    result: 'SUCCESS',
    data: [
      {
        id: 0,
        title: 'To Do',
        teamId: 'string',
        createdAt: '2025-04-23T12:52:11.716Z',
        updatedAt: '2025-04-23T12:52:11.716Z',
      },
      {
        id: 1,
        title: 'On Progress',
        teamId: 'string',
        createdAt: '2025-04-23T12:52:11.716Z',
        updatedAt: '2025-04-23T12:52:11.716Z',
      },
      {
        id: 2,
        title: 'Done',
        teamId: 'string',
        createdAt: '2025-04-23T12:52:11.716Z',
        updatedAt: '2025-04-23T12:52:11.716Z',
      },
    ],
  };

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.container}>
          {COLUMNS?.data.map((column) => <Column key={column.id} column={column} />)}
          <div className={styles.addColumn}>
            <button className={styles.addBtn}>
              새로운 컬럼 추가하기
              <Image src="/icon/add_color.svg" alt="추가 아이콘" width={22} height={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
