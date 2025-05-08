'use client';

import { useUpdateCardMutation } from '@/api/cards/cards.query';
import { UpdateCardRequest } from '@/api/cards/cards.schema';
import { useColumnsQuery } from '@/api/columns/columns.query';
import { ColumnType } from '@/api/columns/columns.schema';
import CreateColumnModal from '@/components/modal/CreateColumnModal';
import ManageColumnModal from '@/components/modal/ManageColumnModal';
import { useOverlay } from '@/contexts/OverlayProvider';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Column from './components/Column';
import CardCreateModal from './components/modal/CardCreateModal';
import styles from './styles/dashboard.module.scss';

export default function DashBoard() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = typeof id === 'string' ? Number(id) : 0;

  const { data, isLoading, isError, refetch } = useColumnsQuery(dashboardId);

  const updateCardMutation = useUpdateCardMutation();
  const { overlay, close } = useOverlay();

  const ClientOnlyDndProvider = dynamic(() => import('./components/ClientOnlyDndProvider'), {
    ssr: false,
  });

  function handleCardDrop(request: UpdateCardRequest) {
    updateCardMutation.mutate(request);
  }

  async function onModalClose() {
    await refetch();
    close();
  }
  function handleClickCreateColumn() {
    overlay(<CreateColumnModal boardId={dashboardId} onClose={onModalClose} />);
  }
  function handleClickEditColumn(column: ColumnType) {
    overlay(<ManageColumnModal boardId={dashboardId} colId={column.id} onClose={onModalClose} />);
  }

  if (!dashboardId) return <div>잘못된 접근입니다.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>에러가 발생했습니다.</div>;

  return (
    <div className={styles.dashboard}>
      <ClientOnlyDndProvider>
        <div className={styles.container}>
          {data?.data.map((column) => (
            <Column
              key={column.id}
              column={column}
              dashboardId={dashboardId}
              onCardDrop={handleCardDrop}
              handleClickEditColumn={handleClickEditColumn}
            />
          ))}
          <div className={styles.addColumn}>
            <button className={styles.addBtn} onClick={handleClickCreateColumn}>
              새로운 컬럼 추가하기
              <Image src="/icon/add_color.svg" alt="추가 아이콘" width={22} height={22} />
            </button>
          </div>
        </div>
      </ClientOnlyDndProvider>
    </div>
  );
}
