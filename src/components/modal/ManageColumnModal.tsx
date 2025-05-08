import styles from './ManageColumnModal.module.scss';
import TwoButtonModal from './TwoButtonModal';
import Input from '../common/Input';
import { useState } from 'react';
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useColumnsQuery,
} from '@/api/columns/columns.query';
import { useOverlay } from '@/contexts/OverlayProvider';
import OneButtonModal from './OneButtonModal';
import Image from 'next/image';

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
  const { overlay, close } = useOverlay();

  function handleUpdateColumn() {
    updateColumnMutation.mutate(
      {
        columnId: colId,
        title: columTitle,
      },
      {
        onSuccess: () => {
          overlay(<OneButtonModal message="컬럼이 수정되었습니다" onClose={onClose} />);
        },
        onError: () => {
          overlay(<OneButtonModal message="컬럼 수정에 실패하였습니다" onClose={close} />);
        },
      },
    );
  }

  function handleDeletePopColumn() {
    overlay(
      <TwoButtonModal
        className={styles.columnModal}
        btns={{
          rightText: '삭제',
          leftText: '취소',
          onConfirm: handleDeleteColumn,
          onCancel: onClose,
        }}
      >
        <div className={styles.message}>칼럼의 모든 카드가 삭제됩니다.</div>
      </TwoButtonModal>,
    );
  }

  function handleDeleteColumn() {
    deleteColumnMutation.mutate(colId, {
      onSuccess: () => {
        overlay(<OneButtonModal message="컬럼이 삭제되었습니다" onClose={onClose} />);
      },
      onError: () => {
        overlay(<OneButtonModal message="컬럼 삭제에 실패했습니다" onClose={close} />);
      },
    });
  }

  return (
    <TwoButtonModal
      className={styles.columnModal}
      btns={{
        rightText: '수정',
        leftText: '삭제',
        onConfirm: handleUpdateColumn,
        onCancel: handleDeletePopColumn,
      }}
    >
      <div className={styles.columnModalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.header}>컬럼 관리</div>
          <button onClick={onClose}>
            <Image src="/icon/X_lg.svg" alt="모달 닫기 버튼 아이콘" width={24} height={24} />
          </button>
        </div>
        <div className={styles.modalInput}>
          <label>이름</label>
          <Input
            name="title"
            placeholder={String(currentColumn)}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
        </div>
      </div>
    </TwoButtonModal>
  );
}
