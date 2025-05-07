import styles from './ManageColumnModal.module.scss';
import TwoButtonModal from './TwoButtonModal';
import Input from '../common/Input';
import { useEffect, useState } from 'react';
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useColumnsQuery,
} from '@/api/columns/columns.query';

type ManageColumnProps = {
  boardId: number;
  colId: number;
  onClose: () => void;
};

export default function ManageColumnModal({ boardId, colId, onClose }: ManageColumnProps) {
  const updateColumnMutation = useUpdateColumnMutation(boardId);
  const deleteColumnMutation = useDeleteColumnMutation(boardId);
  const [columTitle, setColumnTitle] = useState('');
  const columnListMutation = useColumnsQuery(boardId);
  const currentColumn = columnListMutation.data?.data?.find((col) => col.id === colId)?.title;
  const [isModalPopOpen, setIsModalPopOpen] = useState(false);

  function handleUpdateColumn() {
    updateColumnMutation.mutate(
      {
        columnId: colId,
        title: columTitle,
      },
      {
        onSuccess: () => {
          alert('컬럼이 수정되었습니다.');
        },
        onError: () => {
          alert('컬럼 수정 실패');
        },
      },
    );
  }

  function handleDeletePopColumn() {
    setIsModalPopOpen(true);
  }

  function handleDeleteColumn() {
    deleteColumnMutation.mutate(colId, {
      onSuccess: () => {
        alert('칼럼 삭제');
        onClose();
      },
      onError: () => {
        alert('컬럼 삭제 실패');
      },
    });
  }

  return (
    <>
      <TwoButtonModal
        title="컬럼 관리"
        btns={{
          rightText: '수정',
          leftText: '삭제',
          onConfirm: handleUpdateColumn,
          onCancel: handleDeletePopColumn,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className={styles.XButton}>
            ×
          </button>
        </div>
        <div>이름</div>
        <Input
          name="title"
          placeholder={String(currentColumn)}
          onChange={(e) => setColumnTitle(e.target.value)}
        />
      </TwoButtonModal>
      {isModalPopOpen && (
        <TwoButtonModal
          title="칼럼의 모든 카드가 삭제됩니다."
          btns={{
            rightText: '삭제',
            leftText: '취소',
            onConfirm: handleDeleteColumn,
            onCancel: onClose,
          }}
        ></TwoButtonModal>
      )}
    </>
  );
}
