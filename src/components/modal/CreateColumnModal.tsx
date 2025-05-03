import TwoButtonModal from './TwoButtonModal';
import Input from '../common/Input';
import { useState } from 'react';
import { useCreateColumnMutation } from '@/api/columns/columns.query';

type CreacteColumnProps = {
  boardId: number;
  onClose: () => void;
};

export default function CreateColumnModal({ boardId, onClose }: CreacteColumnProps) {
  const createColumnMutation = useCreateColumnMutation(boardId);
  const [columTitle, setColumnTitle] = useState('');

  function handleCreateColumn() {
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
  }

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
