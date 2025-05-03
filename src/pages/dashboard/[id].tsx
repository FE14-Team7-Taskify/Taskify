import { useRouter } from 'next/router';
import Column from './components/Column';
import styles from './styles/dashboard.module.scss';
import Image from 'next/image';
import { useColumnsQuery } from '@/api/columns/columns.query';
import { useUpdateCardMutation } from '@/api/cards/cards.query';
import dynamic from 'next/dynamic';
import { UpdateCardRequest } from '@/api/cards/cards.schema';
import CreateColumnModal from '@/components/modal/CreateColumnModal';
import { useState } from 'react';

export default function DashBoard() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = typeof id === 'string' ? Number(id) : 0;
  const { data, isLoading, isError } = useColumnsQuery(dashboardId);
  const updateCardMutation = useUpdateCardMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const ClientOnlyDndProvider = dynamic(() => import('./components/ClientOnlyDndProvider'), {
    ssr: false,
  });

  const handleCardDrop = (request: UpdateCardRequest) => {
    updateCardMutation.mutate(request);
  };

  const openAddColumnModal = () => {
    console.log(`컬럼 추가 모달 - 대시보드 ID : ${id}`);
    setIsModalOpen(true); //모달열기
  };

  if (!dashboardId) return <div>잘못된 접근입니다.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>에러가 발생했습니다.</div>;

  if ('data' in data) {
    return (
      <>
        <div className={styles.dashboard}>
          <ClientOnlyDndProvider>
            <div className={styles.container}>
              {data?.data.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  dashboardId={id as string}
                  onCardDrop={handleCardDrop}
                />
              ))}
              <div className={styles.addColumn}>
                <button className={styles.addBtn} onClick={openAddColumnModal}>
                  새로운 컬럼 추가하기
                  <Image src="/icon/add_color.svg" alt="추가 아이콘" width={22} height={22} />
                </button>
              </div>
            </div>
          </ClientOnlyDndProvider>
          {isModalOpen && <CreateColumnModal boardId={dashboardId} onClose={closeModal} />}
        </div>
      </>
    );
  }
}
