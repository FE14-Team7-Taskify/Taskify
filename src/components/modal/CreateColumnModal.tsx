import TwoButtonModal from './TwoButtonModal';
import Input from '../common/Input';
import { useEffect, useState } from 'react';
import { useColumnsQuery, useCreateColumnMutation } from '@/api/columns/columns.query';

type CreacteColumnProps = {
  boardId: number;
  onClose: () => void;
};

export default function CreateColumnModal({ boardId, onClose }: CreacteColumnProps) {
  const createColumnMutation = useCreateColumnMutation(boardId);
  const columnListMutation = useColumnsQuery(boardId);
  const [columTitle, setColumnTitle] = useState('');

  function handleCreateColumn() {
    const columnLength = columnListMutation.data?.data.length;
    if ((columnLength ?? 0) < 10) {
      createColumnMutation.mutate(
        {
          title: columTitle,
          dashboardId: boardId,
        },
        {
          onSuccess: () => {
            alert('컬럼이 생성되었습니다.');
          },
          onError: () => {
            alert('컬럼 생성 실패');
          },
        },
      );
    } else {
      alert('컬럼이 10개입니다! 삭제 후 생성 요망!');
    }
  }

  useEffect(() => {
    console.log('컬럼리스트!:', columnListMutation.data?.data.length);
    console.log('컬럼리스트!:', columnListMutation.data?.data);
  });

  return (
    <TwoButtonModal
      title="새 칼럼 생성"
      btns={{
        rightText: '생성',
        leftText: '취소',
        onConfirm: handleCreateColumn,
        onCancel: onClose,
      }}
    >
      <div>이름</div>
      <Input name="title" onChange={(e) => setColumnTitle(e.target.value)} />
    </TwoButtonModal>
  );
}
