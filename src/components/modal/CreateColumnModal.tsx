import TwoButtonModal from './TwoButtonModal';
import Input from '../common/Input';
import { useEffect, useState } from 'react';
import { useColumnsQuery, useCreateColumnMutation } from '@/api/columns/columns.query';
import styles from './ManageColumnModal.module.scss';
import OneButtonModal from './OneButtonModal';
import { useOverlay } from '@/contexts/OverlayProvider';

type CreacteColumnProps = {
  boardId: number;
  onClose: () => void;
};

export default function CreateColumnModal({ boardId, onClose }: CreacteColumnProps) {
  const createColumnMutation = useCreateColumnMutation(boardId);
  const columnListMutation = useColumnsQuery(boardId);
  const [columTitle, setColumnTitle] = useState('');
  const { overlay, close } = useOverlay();

  function handleCreateColumn() {
    const columns = columnListMutation.data?.data ?? [];
    const columnLength = columns.length;

    const isDuplicated = columns.some((column) => column.title.trim() === columTitle.trim());

    if (isDuplicated) {
      overlay(<OneButtonModal message="중복된 컬럼 이름입니다." onClose={close} />);
      return;
    }

    if (columnLength < 10) {
      createColumnMutation.mutate(
        {
          title: columTitle,
          dashboardId: boardId,
        },
        {
          onSuccess: () => {
            overlay(<OneButtonModal message="컬럼이 생성되었습니다" onClose={onClose} />);
          },
          onError: () => {
            overlay(<OneButtonModal message="컬럼 생성에 실패하였습니다" onClose={close} />);
          },
        },
      );
    } else {
      overlay(
        <OneButtonModal
          message="컬럼이 10개를 넘었습니다. 컬럼을 수정하거나 삭제 후 생성해주세요."
          onClose={close}
        />,
      );
    }
  }

  return (
    <TwoButtonModal
      className={styles.columnModal}
      btns={{
        rightText: '생성',
        leftText: '취소',
        onConfirm: handleCreateColumn,
        onCancel: onClose,
        rightDisabled: !columTitle.trim(),
      }}
    >
      <div className={styles.columnModalContent}>
        <div className={styles.modalHeader}>새 컬럼 생성</div>
        <div className={styles.modalInput}>
          <label>이름</label>
          <Input
            name="title"
            placeholder="새로운 프로젝트"
            onChange={(e) => setColumnTitle(e.target.value)}
          />
        </div>
      </div>
    </TwoButtonModal>
  );
}
